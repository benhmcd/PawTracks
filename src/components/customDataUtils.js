// Import Amplify Package's and Auth
import { Amplify, Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';

// Amplify DataStore
import { DataStore } from '@aws-amplify/datastore';
import { Pet } from './models';
import { getPackedSettings } from 'http2';

function getPets()
{
    async function getPetData ()
    {
            const models = await DataStore.query(Pet);
            console.log(models);
            return(
                console.log(models)
            )
    }
}
export default getPets


