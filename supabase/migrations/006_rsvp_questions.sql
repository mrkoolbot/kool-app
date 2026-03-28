-- Store custom RSVP questions per event
ALTER TABLE events ADD COLUMN IF NOT EXISTS rsvp_questions JSONB DEFAULT '[
  {"id": "dietary", "label": "do you have any food allergies or dietary restrictions?", "type": "textarea", "enabled": true, "required": false},
  {"id": "parking", "label": "will you need parking?", "type": "yes-no", "enabled": true, "required": false},
  {"id": "ada", "label": "do you need any ADA arrangements or special accommodations?", "type": "textarea", "enabled": true, "required": false},
  {"id": "plus_one", "label": "will you be bringing a guest?", "type": "yes-no-with-name", "enabled": true, "required": false}
]';

-- Store RSVP answers
ALTER TABLE guests ADD COLUMN IF NOT EXISTS rsvp_answers JSONB DEFAULT '{}';
ALTER TABLE guests ADD COLUMN IF NOT EXISTS plus_one_name TEXT;
ALTER TABLE guests ADD COLUMN IF NOT EXISTS plus_one_attending BOOLEAN;
