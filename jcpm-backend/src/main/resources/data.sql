INSERT INTO users (username, email, password) VALUES ('elliot', 'elliot@proton.com', 'asdw')ON CONFLICT (email) DO NOTHING;;
INSERT INTO users (username, email, password) VALUES ('giovanni_rbn', 'giovanni.fpeople@gmail.com', 'Conejo2003.')ON CONFLICT (email) DO NOTHING;;
