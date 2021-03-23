import React, { Component } from 'react';
import './App.css';
import Profile from './Profile';

class EditProfile extends Component{
     aUserProfileInfo = () => {
        const theStartingProfile = {
          id: null,
          email: '',
          firstname: '',
          lastname: '',
          username: '',
          avatar: Image,
          year: '',
          major: '',
          skills:'',
          bio: '',
        };
        const [theProfileInformation, theEstablishedInformation] = useState(theStartingProfile);
        const handleSave = (e) => {
            e.preventDefault();
            saveInfo();
            setEdit(false);
        };
        //Need to be able to edit avatar, username, year, major, skills, bio 

        const processTheEdit = (e) => {
            e.preventDefault();
            //set edit to true when edit is clicked
            setEdit(true);
          };

          const processRequestedChange = (event) => {
            const { name, value } = event.target;
            setInfo({ ...info, [name]: value });
          };
          const initiateTheInformationProvided = () => {
            var data = {
              email: info.email,
              firstname: info.firstname,
              lastname: info.lastname,
              year: info.year,
              major: info.major,
              skills: info.skills,
              bio: info.bio
            


            };
            if (info.id === null) {
                InfoDataService.create(data)
                  .then((response) => {
                    console.log('create', response.data);
                    setInfo({
                      id: response.data.id,
                      email: response.data.email,
                      firstname: response.data.firstname,
                      lastname: response.data.lastname,
                      year: response.data.year,
                      major: response.data.year,
                      skills: response.data.skills,
                      bio: response.data.bio

                    });
                  })
                  .catch((e) => {
                    console.error(e);
                  });
              } else {
                InfoDataService.update(info.id, data)
                .then((response) => {
                  console.log(response);
                  setInfo({
                    id: response.data.id,
                    email: response.data.email,
                    firstname: response.data.firstname,
                    lastname: response.data.lastname,
                    year: response.data.year,
                    major: response.data.year,
                    skills: response.data.skills,
                    bio: response.data.bio

                  });
                  console.log(response.data);
                })
                .catch((e) => {
                  console.error(e);
                });
            }
        

        }
    }
}
