import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// In-memory storage
const candidates = [];
const recruiters = [];
const interviews = [];

// Candidates endpoints
app.get('/api/candidates', (req, res) => {
  res.json(candidates);
});

app.post('/api/candidates', (req, res) => {
  const candidate = {
    id: String(candidates.length + 1),
    ...req.body,
    created_at: new Date().toISOString()
  };
  candidates.push(candidate);
  res.json(candidate);
});

// Recruiters endpoints
app.get('/api/recruiters', (req, res) => {
  res.json(recruiters);
});

app.post('/api/recruiters', (req, res) => {
  const recruiter = {
    id: String(recruiters.length + 1),
    ...req.body,
    created_at: new Date().toISOString()
  };
  recruiters.push(recruiter);
  res.json(recruiter);
});

// Interviews endpoints
app.get('/api/interviews', (req, res) => {
  res.json(interviews);
});

app.post('/api/interviews', (req, res) => {
  const interview = {
    id: String(interviews.length + 1),
    ...req.body,
    status: 'scheduled',
    created_at: new Date().toISOString()
  };
  interviews.push(interview);
  res.json(interview);
});

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});