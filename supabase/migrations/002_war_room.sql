-- War Room incidents table
CREATE TABLE IF NOT EXISTS war_room_incidents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  note TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE war_room_incidents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own incidents" ON war_room_incidents
  FOR ALL USING (auth.uid() = user_id);

-- War Room staff status table
CREATE TABLE IF NOT EXISTS war_room_staff (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  role TEXT,
  assignment TEXT,
  status TEXT DEFAULT 'not_arrived' CHECK (status IN ('on_site', 'en_route', 'not_arrived')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE war_room_staff ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own staff" ON war_room_staff
  FOR ALL USING (auth.uid() = user_id);

-- War Room vendor status table
CREATE TABLE IF NOT EXISTS war_room_vendor_status (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  status TEXT DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'on_way', 'arrived', 'issue')),
  notes TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE war_room_vendor_status ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own vendor status" ON war_room_vendor_status
  FOR ALL USING (auth.uid() = user_id);

-- War Room timeline completion
ALTER TABLE timeline_items ADD COLUMN IF NOT EXISTS is_completed BOOLEAN DEFAULT FALSE;
