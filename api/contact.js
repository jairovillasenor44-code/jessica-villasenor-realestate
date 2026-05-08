module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, phone, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  const safeText = (str) =>
    String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>New Inquiry</title>
</head>
<body style="margin:0;padding:0;background:#f0ede7;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0ede7;padding:48px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#ffffff;border-radius:4px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:#2c3426;padding:36px 44px;">
            <p style="margin:0 0 4px;font-family:Arial,sans-serif;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#b18463;">Engel &amp; Völkers Reno</p>
            <h1 style="margin:0;font-size:22px;font-weight:400;color:#ffffff;letter-spacing:0.02em;">New Client Inquiry</h1>
            <p style="margin:8px 0 0;font-family:Arial,sans-serif;font-size:12px;color:rgba(255,255,255,0.45);">Submitted via jessicavillasenor.com</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:40px 44px 32px;">

            <!-- Name -->
            <p style="margin:0 0 4px;font-family:Arial,sans-serif;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#b18463;">Name</p>
            <p style="margin:0 0 28px;font-size:16px;color:#1a1a1a;">${safeText(name)}</p>

            <!-- Email -->
            <p style="margin:0 0 4px;font-family:Arial,sans-serif;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#b18463;">Email</p>
            <p style="margin:0 0 28px;font-size:16px;"><a href="mailto:${safeText(email)}" style="color:#2c3426;text-decoration:none;border-bottom:1px solid #b18463;">${safeText(email)}</a></p>

            ${phone ? `<!-- Phone -->
            <p style="margin:0 0 4px;font-family:Arial,sans-serif;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#b18463;">Phone</p>
            <p style="margin:0 0 28px;font-size:16px;color:#1a1a1a;">${safeText(phone)}</p>` : ''}

            <!-- Divider -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
              <tr><td style="border-top:1px solid #e8e4dc;font-size:0;">&nbsp;</td></tr>
            </table>

            <!-- Message -->
            <p style="margin:0 0 12px;font-family:Arial,sans-serif;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#b18463;">Message</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="background:#f7f4ef;border-left:3px solid #b18463;padding:18px 22px;font-size:15px;color:#1a1a1a;line-height:1.7;border-radius:0 3px 3px 0;">
                  ${safeText(message).replace(/\n/g, '<br>')}
                </td>
              </tr>
            </table>

            <!-- Reply button -->
            <table cellpadding="0" cellspacing="0" style="margin-top:32px;">
              <tr>
                <td style="background:#2c3426;border-radius:2px;">
                  <a href="mailto:${safeText(email)}?subject=Re: Your inquiry — Jessica Villaseñor Real Estate" style="display:inline-block;padding:13px 28px;font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#ffffff;text-decoration:none;">Reply to ${safeText(name)}</a>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f7f4ef;padding:20px 44px;border-top:1px solid #e8e4dc;">
            <p style="margin:0;font-family:Arial,sans-serif;font-size:11px;color:#999999;">
              Jessica Villaseñor · Engel &amp; Völkers Reno · (775) 813-6992<br>
              This message was submitted through the contact form on your website.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Jessica Villaseñor Website <onboarding@resend.dev>',
        to: process.env.CONTACT_EMAIL || 'jairovillasenor101@gmail.com',
        reply_to: email,
        subject: `New inquiry from ${name} — Jessica Villaseñor Real Estate`,
        html
      })
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Resend error:', err);
      return res.status(500).json({ success: false });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Contact handler error:', err);
    return res.status(500).json({ success: false });
  }
};
