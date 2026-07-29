function doGet(e) {
  return HtmlService.createHtmlOutput('<p>Contact form endpoint is ready.</p>');
}

function doPost(e) {
  const data = e.parameter || {};
  const name = data.name || 'Unknown';
  const contact = data.contact || 'Not provided';
  const message = data.message || 'No message provided';

  const subject = `New contact form submission from ${name}`;
  const body = [
    `Name: ${name}`,
    `Phone / Email: ${contact}`,
    'Message:',
    message
  ].join('\n');

  MailApp.sendEmail({
    to: 'contact@arscpa.com',
    subject: subject,
    body: body
  });

  return ContentService.createTextOutput(JSON.stringify({ status: 'success' })).setMimeType(ContentService.MimeType.JSON);
}
