Title: feat: Airtel modal (replace edit modal)

This PR updates the admin Edit modal to match the Airtel Money design shown in the provided screenshot. Changes made on branch update/airtel-modal:

- public/admin.html: Replaced the Edit modal markup with the Airtel-styled modal. Kept existing input IDs (#editName, #editYasPin) so admin.js continues to work.
- public/admin-style.css: Updated modal styles to match Airtel look — blurred background, translucent red panel, large blue brand text, styled inputs and button.
- public/assets/airtel-bg.jpg: Added the Airtel background image (used as the blurred backdrop when the modal is active).

No changes were made to the entries table, admin panel layout, tabs, or admin.js logic.

Please review the modal and background; I can adjust sizing, spacing, or colors if needed.
