import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import pool from '../config/database';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = express.Router();

// Submit contact message
router.post('/messages', async (req, res) => {
  try {
    const { name, email, subject, message, userId } = req.body;

    // Validate input
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const messageId = uuidv4();
    const result = await pool.query(
      `INSERT INTO contact_messages (id, user_id, name, email, subject, message) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`,
      [messageId, userId || null, name, email, subject, message]
    );

    res.status(201).json({
      message: 'Message sent successfully',
      contactMessage: result.rows[0]
    });
  } catch (error) {
    console.error('Contact message error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get contact messages (admin only - simplified for demo)
router.get('/messages', async (req, res) => {
  try {
    const { status, limit = 50 } = req.query;

    let query = 'SELECT * FROM contact_messages';
    const params: any[] = [];
    
    if (status) {
      query += ' WHERE status = $1';
      params.push(status);
    }

    query += ' ORDER BY created_at DESC LIMIT $' + (params.length + 1);
    params.push(parseInt(limit as string));

    const result = await pool.query(query, params);

    res.json({
      messages: result.rows
    });
  } catch (error) {
    console.error('Get contact messages error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update message status
router.patch('/messages/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['unread', 'read', 'responded', 'archived'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const result = await pool.query(
      'UPDATE contact_messages SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Message not found' });
    }

    res.json({
      message: 'Status updated successfully',
      contactMessage: result.rows[0]
    });
  } catch (error) {
    console.error('Update message status error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;