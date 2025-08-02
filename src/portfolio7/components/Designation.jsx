import React, { useEffect } from 'react';

function Designation({ userId }) {
  useEffect(() => {
    // Fetch basic details
    console.log('test');
    fetch('/admin/getBasicDetails')
      .then(res => res.json())
      .then(data => {
        console.log('test');
        if (data?.data) {
          const {
            firstName, lastName, jobTitle, primaryContact,
            primaryMail, address, occupation, description, dateOfBirth, secondaryContact, secondaryMail
          } = data.data;

          const updateElements = (className, value) => {
            const elements = document.getElementsByClassName(className);
            for (let el of elements) {
              if (value && value.trim()) {
                el.innerHTML = value; 
                el.style.display = '';
              } else {
                el.style.display = 'none';
              }
            }
          };

          updateElements('firstName', firstName);
          updateElements('lastName', lastName);
          updateElements('jobTitle', jobTitle);
          updateElements('primaryContact', primaryContact);
          updateElements('secondaryContact', secondaryContact);
          updateElements('primaryMail', primaryMail);
          updateElements('secondaryMail', secondaryMail);
          updateElements('address', address);
          updateElements('occupation', occupation);
          updateElements('description', description);
          updateElements('dateOfBirth', dateOfBirth);
        }
      });

    // Fetch social media links
    fetch(`/social`)
      .then(res => res.json())
      .then(data => {
        if (data?.status?.success && data.data) {
          const links = data.data;

          const updateLink = (id, url) => {
            const el = document.getElementById(id);
            if (el) {
              if (url) {
                el.href = url;
                el.style.display = 'flex';
              } else {
                el.style.display = 'none';
              }
            }
          };

          updateLink('fbUrl', links.fbUrl);
          updateLink('twitterURL', links.twitterURL);
          updateLink('instaURL', links.instaURL);
          updateLink('whatsappURL', links.whatsappURL);
          updateLink('linkedInURL', links.linkedInURL);
          updateLink('webURL', links.webURL);
          updateLink('ytURL', links.ytURL);
          updateLink('pintrestURL', links.pintrestURL);
          updateLink('tiktokURL', links.tiktokURL);
          updateLink('tumblrURL', links.tumblrURL);
          updateLink('threadURL', links.threadURL);
          updateLink('redditURL', links.redditURL);
          updateLink('discordURL', links.discordURL);
        
        }
      });
  });

  return null; 
}

export default Designation;
