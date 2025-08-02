import React, { useEffect } from 'react';

function Designation() {
  useEffect(() => {
    fetch('http://localhost:8085/admin/getBasicDetails')
      .then(res => res.json())
      .then(data => {
        if (data?.data) {
          const {
            firstName, lastName, jobTitle, primaryContact,
            primaryMail, address, occupation, description, dateOfBirth,
            secondaryContact, secondaryMail
          } = data.data;

          const updateElements = (className: string, value: string) => {
            const elements = document.getElementsByClassName(className);
            for (let el of Array.from(elements)) {
              const element = el as HTMLElement;
              if (value?.trim()) {
                element.innerHTML = value;
                element.style.display = '';
              } else {
                element.style.display = 'none';
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
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []); // empty dependency array so it runs once

  return null; // This component doesn't render anything directly
}

export default Designation;
