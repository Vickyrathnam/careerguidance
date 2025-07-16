import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import pool from '../config/database';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = express.Router();

// Get all mentors
router.get('/', async (req, res) => {
  try {
    const { expertise, company, minRating } = req.query;
    
    let query = 'SELECT * FROM mentors WHERE availability_status = $1';
    const params: any[] = ['available'];
    let paramIndex = 2;

    if (expertise) {
      query += ` AND $${paramIndex} = ANY(expertise)`;
      params.push(expertise);
      paramIndex++;
    }

    if (company) {
      query += ` AND LOWER(company) LIKE LOWER($${paramIndex})`;
      params.push(`%${company}%`);
      paramIndex++;
    }

    if (minRating) {
      query += ` AND rating >= $${paramIndex}`;
      params.push(parseFloat(minRating as string));
      paramIndex++;
    }

    query += ' ORDER BY rating DESC, total_sessions DESC';

    const result = await pool.query(query, params);

    res.json({
      mentors: result.rows
    });
  } catch (error) {
    console.error('Get mentors error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get mentor by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query('SELECT * FROM mentors WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Mentor not found' });
    }

    res.json({
      mentor: result.rows[0]
    });
  } catch (error) {
    console.error('Get mentor error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Book a session with mentor
router.post('/:id/book-session', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { id: mentorId } = req.params;
    const userId = req.user!.id;
    const { sessionDate, duration, notes } = req.body;

    // Validate mentor exists and is available
    const mentorResult = await pool.query(
      'SELECT * FROM mentors WHERE id = $1 AND availability_status = $2',
      [mentorId, 'available']
    );

    if (mentorResult.rows.length === 0) {
      return res.status(404).json({ error: 'Mentor not found or not available' });
    }

    // Create session
    const sessionId = uuidv4();
    const result = await pool.query(
      `INSERT INTO mentor_sessions (id, user_id, mentor_id, session_date, duration, notes) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`,
      [sessionId, userId, mentorId, sessionDate, duration, notes]
    );

    // Update mentor's total sessions
    await pool.query(
      'UPDATE mentors SET total_sessions = total_sessions + 1 WHERE id = $1',
      [mentorId]
    );

    res.status(201).json({
      message: 'Session booked successfully',
      session: result.rows[0]
    });
  } catch (error) {
    console.error('Book session error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user's mentor sessions
router.get('/sessions/my-sessions', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;

    const result = await pool.query(
      `SELECT ms.*, m.name as mentor_name, m.title as mentor_title, m.company as mentor_company, m.image_url as mentor_image
       FROM mentor_sessions ms
       JOIN mentors m ON ms.mentor_id = m.id
       WHERE ms.user_id = $1
       ORDER BY ms.session_date DESC`,
      [userId]
    );

    res.json({
      sessions: result.rows
    });
  } catch (error) {
    console.error('Get user sessions error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;