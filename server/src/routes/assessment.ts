import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import pool from '../config/database';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = express.Router();

// Save assessment response
router.post('/responses', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;
    const { interests, skills, values, workStyle, education, experience, personality } = req.body;

    const assessmentId = uuidv4();
    const result = await pool.query(
      `INSERT INTO assessment_responses 
       (id, user_id, interests, skills, values, work_style, education, experience, personality) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
       RETURNING *`,
      [assessmentId, userId, interests, skills, values, workStyle, education, experience, personality]
    );

    res.status(201).json({
      message: 'Assessment response saved successfully',
      assessment: result.rows[0]
    });
  } catch (error) {
    console.error('Assessment save error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Save career matches
router.post('/career-matches', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;
    const { assessmentId, careerMatches } = req.body;

    const insertPromises = careerMatches.map((match: any) => {
      const matchId = uuidv4();
      return pool.query(
        `INSERT INTO career_matches (id, user_id, assessment_id, career_title, match_score, career_data) 
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [matchId, userId, assessmentId, match.title, match.matchScore, JSON.stringify(match)]
      );
    });

    await Promise.all(insertPromises);

    res.status(201).json({
      message: 'Career matches saved successfully'
    });
  } catch (error) {
    console.error('Career matches save error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user's assessment history
router.get('/history', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;

    const assessments = await pool.query(
      `SELECT ar.*, cm.career_title, cm.match_score, cm.career_data 
       FROM assessment_responses ar 
       LEFT JOIN career_matches cm ON ar.id = cm.assessment_id 
       WHERE ar.user_id = $1 
       ORDER BY ar.created_at DESC`,
      [userId]
    );

    res.json({
      assessments: assessments.rows
    });
  } catch (error) {
    console.error('Assessment history error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;