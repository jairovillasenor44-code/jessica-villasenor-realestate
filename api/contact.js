module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, phone, interest, message } = req.body || {};

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
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f0ede7;padding:40px 16px;">
<tr><td align="center">
<table width="580" cellpadding="0" cellspacing="0" style="max-width:580px;width:100%;border-radius:4px;overflow:hidden;box-shadow:0 4px 28px rgba(0,0,0,0.12);">

  <!-- ── HEADER ── -->
  <tr>
    <td style="background:#2c3426;padding:32px 40px;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="vertical-align:middle;width:84px;padding-right:20px;">
            <img src="https://villrealestate.com/brand_assets/jessica.jpg"
                 alt="Jessica Villaseñor" width="76" height="76"
                 style="display:block;border-radius:50%;border:2px solid #b18463;object-fit:cover;">
          </td>
          <td style="vertical-align:middle;">
            <p style="margin:0 0 3px;font-family:Arial,sans-serif;font-size:9px;letter-spacing:0.22em;text-transform:uppercase;color:#b18463;">Engel &amp; Völkers · Reno</p>
            <p style="margin:0 0 5px;font-size:22px;font-weight:400;color:#ffffff;letter-spacing:0.02em;">Jessica Villaseñor</p>
            <p style="margin:0;font-family:Arial,sans-serif;font-size:10px;letter-spacing:0.08em;text-transform:uppercase;color:rgba(255,255,255,0.45);">REALTOR<sup style="font-size:7px;">®</sup> &nbsp;·&nbsp; (775) 813-6992</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- ── COPPER LABEL STRIP ── -->
  <tr>
    <td style="background:#b18463;padding:10px 40px;">
      <p style="margin:0;font-family:Arial,sans-serif;font-size:9px;letter-spacing:0.24em;text-transform:uppercase;color:#ffffff;">New Client Inquiry &nbsp;·&nbsp; Submitted via villrealestate.com</p>
    </td>
  </tr>

  <!-- ── AT-A-GLANCE SNAPSHOT ── -->
  <tr>
    <td style="background:#243020;padding:20px 40px;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="vertical-align:top;padding-right:20px;">
            <p style="margin:0 0 4px;font-family:Arial,sans-serif;font-size:8px;letter-spacing:0.18em;text-transform:uppercase;color:#b18463;">Client</p>
            <p style="margin:0;font-family:Arial,sans-serif;font-size:14px;font-weight:600;color:#ffffff;">${safeText(name)}</p>
          </td>
          ${phone ? `<td style="vertical-align:top;padding-right:20px;">
            <p style="margin:0 0 4px;font-family:Arial,sans-serif;font-size:8px;letter-spacing:0.18em;text-transform:uppercase;color:#b18463;">Phone</p>
            <p style="margin:0;font-family:Arial,sans-serif;font-size:14px;font-weight:600;"><a href="tel:${safeText(phone)}" style="color:#ffffff;text-decoration:none;">${safeText(phone)}</a></p>
          </td>` : ''}
          ${interest ? `<td style="vertical-align:top;">
            <p style="margin:0 0 4px;font-family:Arial,sans-serif;font-size:8px;letter-spacing:0.18em;text-transform:uppercase;color:#b18463;">Looking to</p>
            <p style="margin:0;font-family:Arial,sans-serif;font-size:14px;font-weight:600;color:#ffffff;">${safeText(interest)}</p>
          </td>` : ''}
        </tr>
      </table>
    </td>
  </tr>

  <!-- ── BODY ── -->
  <tr>
    <td style="background:#ffffff;padding:36px 40px 32px;">

      <!-- Email -->
      <p style="margin:0 0 4px;font-family:Arial,sans-serif;font-size:9px;letter-spacing:0.18em;text-transform:uppercase;color:#b18463;">Email</p>
      <p style="margin:0 0 28px;font-size:15px;line-height:1.5;">
        <a href="mailto:${safeText(email)}" style="color:#2c3426;text-decoration:none;border-bottom:1px solid #b18463;padding-bottom:1px;">${safeText(email)}</a>
      </p>

      <!-- Divider -->
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
        <tr><td style="border-top:1px solid #e8e4dc;font-size:0;">&nbsp;</td></tr>
      </table>

      <!-- Message -->
      <p style="margin:0 0 14px;font-family:Arial,sans-serif;font-size:9px;letter-spacing:0.18em;text-transform:uppercase;color:#b18463;">Message</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:36px;">
        <tr>
          <td style="background:#f7f4ef;border-left:3px solid #b18463;padding:18px 22px;font-size:15px;color:#1a1a1a;line-height:1.8;border-radius:0 3px 3px 0;">
            ${safeText(message).replace(/\n/g, '<br>')}
          </td>
        </tr>
      </table>

      <!-- Reply button -->
      <table cellpadding="0" cellspacing="0">
        <tr>
          <td style="background:#2c3426;border-radius:2px;">
            <a href="mailto:${safeText(email)}?subject=Re%3A Your inquiry %E2%80%94 Jessica Villase%C3%B1or Real Estate"
               style="display:inline-block;padding:14px 30px;font-family:Arial,sans-serif;font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:#ffffff;text-decoration:none;">
              Reply to ${safeText(name)}
            </a>
          </td>
          ${phone ? `<td style="padding-left:12px;">
            <a href="tel:${safeText(phone)}"
               style="display:inline-block;padding:14px 30px;font-family:Arial,sans-serif;font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:#2c3426;text-decoration:none;border:1px solid #2c3426;border-radius:2px;">
              Call ${safeText(name).split(' ')[0]}
            </a>
          </td>` : ''}
        </tr>
      </table>

    </td>
  </tr>

  <!-- ── FOOTER ── -->
  <tr>
    <td style="background:#2c3426;padding:18px 40px;">
      <p style="margin:0;font-family:Arial,sans-serif;font-size:10px;color:rgba(255,255,255,0.40);line-height:1.7;">
        Jessica Villaseñor &nbsp;·&nbsp; Engel &amp; Völkers Reno &nbsp;·&nbsp; (775) 813-6992<br>
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
        to: process.env.CONTACT_EMAIL || 'villasrealestate27@gmail.com',
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

    const firstName = safeText(name).split(' ')[0];
    const autoReplyHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Thanks for reaching out</title>
</head>
<body style="margin:0;padding:0;background:#f0ede7;font-family:Georgia,serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f0ede7;padding:40px 16px;">
<tr><td align="center">
<table width="580" cellpadding="0" cellspacing="0" style="max-width:580px;width:100%;border-radius:4px;overflow:hidden;box-shadow:0 4px 28px rgba(0,0,0,0.12);">

  <tr>
    <td style="background:#2c3426;padding:32px 40px;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="vertical-align:middle;width:84px;padding-right:20px;">
            <img src="https://villrealestate.com/brand_assets/jessica.jpg"
                 alt="Jessica Villaseñor" width="76" height="76"
                 style="display:block;border-radius:50%;border:2px solid #b18463;object-fit:cover;">
          </td>
          <td style="vertical-align:middle;">
            <p style="margin:0 0 3px;font-family:Arial,sans-serif;font-size:9px;letter-spacing:0.22em;text-transform:uppercase;color:#b18463;">Engel &amp; Völkers · Reno</p>
            <p style="margin:0 0 5px;font-size:22px;font-weight:400;color:#ffffff;letter-spacing:0.02em;">Jessica Villaseñor</p>
            <p style="margin:0;font-family:Arial,sans-serif;font-size:10px;letter-spacing:0.08em;text-transform:uppercase;color:rgba(255,255,255,0.45);">REALTOR<sup style="font-size:7px;">®</sup> &nbsp;·&nbsp; (775) 813-6992</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <tr>
    <td style="background:#b18463;padding:10px 40px;">
      <p style="margin:0;font-family:Arial,sans-serif;font-size:9px;letter-spacing:0.24em;text-transform:uppercase;color:#ffffff;">Message Received</p>
    </td>
  </tr>

  <tr>
    <td style="background:#ffffff;padding:40px 40px 36px;">
      <p style="margin:0 0 20px;font-size:22px;font-family:Georgia,serif;color:#1a1a1a;line-height:1.3;">Hi ${firstName},</p>
      <p style="margin:0 0 18px;font-family:Arial,sans-serif;font-size:15px;color:#1a1a1a;line-height:1.7;">Thank you for reaching out — I received your message and will be in touch within <strong>24 hours</strong>.</p>
      <p style="margin:0 0 32px;font-family:Arial,sans-serif;font-size:15px;color:#5e5e5e;line-height:1.7;">In the meantime, feel free to call or text me directly if you have any urgent questions.</p>
      <table cellpadding="0" cellspacing="0">
        <tr>
          <td style="background:#2c3426;border-radius:2px;">
            <a href="tel:7758136992"
               style="display:inline-block;padding:14px 30px;font-family:Arial,sans-serif;font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:#ffffff;text-decoration:none;">
              Call (775) 813-6992
            </a>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <tr>
    <td style="background:#2c3426;padding:18px 40px;">
      <p style="margin:0;font-family:Arial,sans-serif;font-size:10px;color:rgba(255,255,255,0.40);line-height:1.7;">
        Jessica Villaseñor &nbsp;·&nbsp; Engel &amp; Völkers Reno &nbsp;·&nbsp; (775) 813-6992<br>
        You're receiving this because you submitted an inquiry on villrealestate.com.
      </p>
    </td>
  </tr>

</table>
</td></tr>
</table>
</body>
</html>`;

    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Jessica Villaseñor <onboarding@resend.dev>',
        to: email,
        subject: `Got your message, ${firstName} — Jessica Villaseñor Real Estate`,
        html: autoReplyHtml
      })
    }).catch(err => console.error('Auto-reply error:', err.message));

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Contact handler error:', err.name, err.message);
    return res.status(500).json({ success: false });
  }
};
