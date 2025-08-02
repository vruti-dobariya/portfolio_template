export const generateVCard = async () => {
  const getText = (id) => document.getElementById(id)?.innerText || '';
  const getHref = (id) => document.getElementById(id)?.href || '';
  const getImageBase64 = async (id) => {
    return new Promise((resolve) => {
      const img = document.getElementById(id);
      if (!img) return resolve('');
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const base64 = canvas.toDataURL('image/jpeg').replace(/^data:image\/(jpeg|png);base64,/, '');
      resolve(base64);
    });
  };

  const firstName = getText('firstname');
  const lastName = getText('lastname');
  const jobTitle = getText('jobTitle');
  const primaryMail = getText('primaryMail');
  const secondaryMail = getText('secondaryMail');
  const primaryContact = getText('primaryContact');
  const secondaryContact = getText('secondaryContact_contact');
  const cardName = getText('cardName');
  const address = getText('address');
  const dob = getText('dob');
  const web = getHref('webURL');

  const profileImage = await getImageBase64('profilePhotoPath');
  const logoImage = await getImageBase64('companyLogoPath');

  let vCardData = `BEGIN:VCARD\nVERSION:4.0\n`;
  vCardData += `N:${lastName};${firstName};;;\n`;
  vCardData += `FN:${firstName} ${lastName}\n`;
  if (cardName) vCardData += `ORG:${cardName}\n`;
  if (jobTitle) vCardData += `TITLE:${jobTitle}\n`;
  if (address) vCardData += `ADR:;;${address};;;;\n`;
  if (dob) vCardData += `BDAY:${dob}\n`;
  if (primaryContact) vCardData += `TEL;TYPE=work,voice:${primaryContact}\n`;
  if (secondaryContact) vCardData += `TEL;TYPE=cell:${secondaryContact}\n`;
  if (primaryMail) vCardData += `EMAIL;TYPE=work:${primaryMail}\n`;
  if (secondaryMail) vCardData += `EMAIL;TYPE=home:${secondaryMail}\n`;
  if (web) vCardData += `URL:${web}\n`;
  if (profileImage) vCardData += `PHOTO;ENCODING=b;TYPE=JPEG:${profileImage}\n`;
  if (logoImage) vCardData += `LOGO;ENCODING=b;TYPE=JPEG:${logoImage}\n`;

  const addSocial = (label, id) => {
    const url = getHref(id);
    if (url) vCardData += `item1.URL:${url}\nitem1.X-ABLabel:${label}\n`;
  };

  addSocial('Facebook', 'fbUrl');
  addSocial('Twitter', 'twitterURL');
  addSocial('Instagram', 'instaURL');
  addSocial('WhatsApp', 'whatsappURL');
  addSocial('LinkedIn', 'linkedInURL');
  addSocial('Website', 'webURL');
  addSocial('YouTube', 'ytURL');
  addSocial('Pinterest', 'pintrestURL');
  addSocial('Tumblr', 'tumblrURL');
  addSocial('Reddit', 'redditURL');

  vCardData += 'END:VCARD';

  const blob = new Blob([vCardData], { type: 'text/vcard' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${firstName || 'contact'}.vcf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
