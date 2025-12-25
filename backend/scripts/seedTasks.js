import dotenv from 'dotenv';
dotenv.config();

import '../src/config/db.js';
import bcrypt from 'bcrypt';
import User from '../src/models/User.js';
import Task from '../src/models/Task.js';

async function upsertUser(user) {
  const hashed = await bcrypt.hash(user.password || 'password123', 10);
  const doc = await User.findOneAndUpdate(
    { email_id: user.email_id },
    {
      $setOnInsert: {
        first_name: user.first_name,
        last_name: user.last_name,
        phone_number: user.phone_number,
        email_id: user.email_id,
        password: hashed,
        isVerified: true,
      }
    },
    { upsert: true, new: true }
  );
  return doc;
}

async function seed() {
  try {
    console.log('Seeding sample users and tasks...');

    const usersData = [
      { first_name: 'Robert', last_name: 'Wilson', email_id: 'robert@example.com', phone_number: '1234567890', password: 'password123' },
      { first_name: 'Jane', last_name: 'Smith', email_id: 'jane@example.com', phone_number: '9876543210', password: 'password123' }
    ];

    const users = {};
    for (const u of usersData) {
      const doc = await upsertUser(u);
      users[doc.email_id] = doc;
      console.log('Upserted user:', doc.email_id);
    }

    const tasksData = [
      {
        title: 'Help Moving Furniture',
        description: 'Need help moving a few large items (sofa, bed, dresser). All items are on the ground floor, moving to an apartment.',
        location: 'Downtown Central, USA',
        start_time: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        status: 1,
        picture: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=60',
        userEmail: 'robert@example.com'
      },
      {
        title: 'Garden Maintenance',
        description: 'Looking for someone to help with weeding and lawn mowing this weekend.',
        location: 'North Hills, USA',
        start_time: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        status: 1,
        picture: 'https://images.unsplash.com/photo-1558905619-171501fd693c?auto=format&fit=crop&w=800&q=60',
        userEmail: 'jane@example.com'
      },
      {
        title: 'Computer Setup Help',
        description: 'Looking for someone to help with new computer setup.',
        location: 'Downtown Seattle, WA',
        start_time: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        status: 1,
        picture: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=800&q=60',
        userEmail: 'robert@example.com'
      },
      {
        title: 'Garden Cleanup',
        description: 'Weeding, trimming hedges, and general yard maintenance.',
        location: 'Bellevue, WA',
        start_time: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
        status: 1,
        picture: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=60',
        userEmail: 'jane@example.com'
      }
    ];

    for (const t of tasksData) {
      const owner = users[t.userEmail];
      if (!owner) {
        console.warn('No owner for task', t.title);
        continue;
      }

      const exists = await Task.findOne({ title: t.title, user_id: owner._id });
      if (exists) {
        console.log('Task already exists:', t.title);
        continue;
      }

      await Task.create({
        user_id: owner._id,
        title: t.title,
        description: t.description,
        location: t.location,
        start_time: t.start_time,
        end_time: null,
        status: t.status,
        category: '',
        picture: t.picture
      });
      console.log('Inserted task:', t.title);
    }

    console.log('Seeding complete.');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
}

seed();
