import { Session } from '../models'; // import your Session model from your models file

import { DataStore } from '@aws-amplify/datastore';

export async function SaveSession(clips, startTime, endTime) {
  
  const session = new Session({
    "start": startTime.toISOString(),
    "end": endTime.toISOString(),
    "clip": clips
  });
  if (!clips.Clips || clips.Clips.length === 0) {
    console.log('Clip object was empty. Session not saved to DataStore.');
    return;
  }
  else{
    try {
      await DataStore.save(session);
      console.log('Session saved to DataStore:', session);
    } catch (error) {
      console.error('Error saving session to DataStore:', error);
    }
  }
}