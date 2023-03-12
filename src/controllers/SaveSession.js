import { Session } from '../models'; // import your Session model from your models file

import { DataStore } from '@aws-amplify/datastore';

async function saveSessionToDataStore(clips, startTime, endTime) {
  const session = new Session({
    "start": startTime,
    "end": endTime,
    "clip": clips
  });

  try {
    await DataStore.save(session);
    console.log('Session saved to DataStore:', session);
  } catch (error) {
    console.error('Error saving session to DataStore:', error);
  }
}
export default saveSession;