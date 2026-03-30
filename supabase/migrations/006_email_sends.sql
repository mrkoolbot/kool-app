CREATE TABLE IF NOT EXISTS email_sends (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  sequence_id TEXT NOT NULL,
  sent_count INTEGER DEFAULT 0,
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  sent_by UUID REFERENCES auth.users(id)
);

CREATE TABLE IF NOT EXISTS email_sequences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  sequence_id TEXT NOT NULL,
  enabled BOOLEAN DEFAULT TRUE,
  custom_subject TEXT,
  custom_body TEXT,
  trigger_days INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(event_id, sequence_id)
);
