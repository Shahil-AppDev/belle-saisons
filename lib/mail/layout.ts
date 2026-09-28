import { siteConfig } from "@/lib/site";

/**
 * Gabarit HTML commun à tous les emails transactionnels : sobre,
 * compatible clients mail (CSS inline uniquement, polices web-safe),
 * identité Belle Saisons (logo officiel, ivoire, doré).
 */
export function wrapEmailHtml({
  preheader,
  bodyHtml,
}: {
  preheader: string;
  bodyHtml: string;
}): string {
  const logoUrl = `${siteConfig.url}${siteConfig.logoPath}`;

  return `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${siteConfig.name}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#faf6ee;font-family:Georgia,'Times New Roman',serif;">
    <span style="display:none;font-size:1px;color:#faf6ee;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
      ${preheader}
    </span>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#faf6ee;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#fdfbf6;border:1px solid rgba(31,27,22,0.1);">
            <tr>
              <td align="center" style="padding:32px 32px 16px;">
                <img src="${logoUrl}" alt="${siteConfig.name}" width="72" height="72" style="display:block;object-fit:contain;" />
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:0 32px 24px;">
                <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#7d5e28;">
                  Conciergerie Belle Saisons
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px 8px;border-top:1px solid rgba(207,169,106,0.4);"></td>
            </tr>
            <tr>
              <td style="padding:24px 32px 8px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#1f1b16;">
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px 32px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;color:#6b5a44;border-top:1px solid rgba(31,27,22,0.08);margin-top:24px;">
                <p style="margin:16px 0 0;">
                  <a href="${siteConfig.url}" style="color:#7d5e28;text-decoration:underline;">${siteConfig.url.replace(/^https?:\/\//, "")}</a>
                  &nbsp;·&nbsp; ${siteConfig.region}
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
