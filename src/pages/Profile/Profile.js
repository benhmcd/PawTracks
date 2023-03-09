import React from 'react';
import { useParams } from 'react-router-dom';
import './Profile.css';
import { SliderField } from '@aws-amplify/ui-react';
import Multiselect from 'multiselect-react-dropdown';

function Profile() {
    var restrictedAreas = [{ name: 'Bed', id: 1 }, { name: 'Couch', id: 2 }, { name: 'Chair', id: 3 },];
    var selectedAreas = [];

    var restrictedPets = [{ name: 'Dog', id: 1 }, { name: 'Cat', id: 2 }, { name: 'Bird' },];
    var selectedPets = [];

    function onSelectArea(selectedAreas, selectedItem) {
        console.log("All Selected Areas: " + selectedAreas);
        console.log("Selected Area: " + selectedItem.name);
    }

    function onRemoveArea(selectedAreas, removedItem) {
        //Remove item from array
        console.log("All Selected Areas: " + selectedAreas);
        console.log("Removed Area: " + removedItem.name);
    }

    function onSelectPet(selectedPets, selectedItem) {
        console.log("All Selected Pets: " + selectedPets);
        console.log("Selected Pet: " + selectedItem.name);
    }

    function onRemovePet(selectedPets, removedItem) {
        //Remove item from array
        console.log("All Selected Pets: " + selectedPets);
        console.log("Removed Pet: " + removedItem.name);
    }
    return (
        <>
            <h1>Profile</h1>
            <h1>Settings</h1>
            <SliderField label='Minimum Confidence:' max={1} step={0.1} size='large' filledTrackColor="var(--secondaryColor)" thumbColor="var(--backgroundColor)" />
            <Multiselect id='restrictedAreaSelect' options={restrictedAreas}
                selectedValues={selectedAreas}
                onSelect={onSelectArea}
                onRemove={onRemoveArea}
                displayValue="name"
                placeholder='Select areas to restrict'
            />

            <Multiselect id='restrictedPetSelect' options={restrictedPets}
                selectedValues={selectedPets}
                onSelect={onSelectPet}
                onRemove={onRemovePet}
                displayValue="name"
                placeholder='Select pets to restrict'
            />
        </>
    )

}

export default Profile