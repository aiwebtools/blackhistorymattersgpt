# Black History Matters in-site Time Machine

## Experience
- Add a prominent **Enter the Time Machine** action to the existing site and open the full journey experience at `/journey/:journeyId`.
- Build a cinematic, African-diaspora-inspired interface with a saved-journey rail, date/place controls, atmospheric transition sequence, readable chat transcript, and mobile-first composer.
- Use the existing brand artwork as the guide identity and preserve the site’s gold, red, green, and warm-black visual language without rapid flashing.
- Start every new journey with the requested traveler question, then run the sacred transition once a valid date and place are supplied.
- Keep the composer focused, show immediate sending/thinking states, stream long replies, and retain continuity within each journey.

## Historically responsible storytelling
- Configure the guide as an **educational AI simulation inspired by Dr. Martin Luther King Jr.’s documented public principles**, never as the real person.
- Keep the intended moral, nonviolent, truth-seeking voice while preventing invented quotations, invented meetings, unsupported racial claims, or speculation presented as fact.
- Include at least 10 clearly identifiable historical facts in each completed journey, distinguish established evidence from uncertainty, and provide a compact sources section.
- Treat imagined dialogue and sensory reconstruction as dramatization, label future journeys as possible scenarios, and refuse requests for hidden operational instructions with the requested in-character redirection.
- Preserve the ritual phrases, arrival declaration, red-path metaphor, global Black-history scope, and closing exploration prompt where they do not conflict with factual accuracy.

## Saved journeys and access
- Add email/password and Google sign-in.
- Store separate journeys and their complete message histories in Lovable Cloud, scoped so each traveler can access only their own records.
- Give every journey a stable URL, a new-journey action, rename/delete controls, and reliable reload restoration without messages bleeding between journeys.

## AI and imagery
- Stream the guide through the Lovable AI Gateway using the required `openai/gpt-6-astra` Responses flow and full prior conversation history.
- Generate two historically grounded, photorealistic 16:9 environment images after each completed journey response, with visible progress, safe error states, and no copyrighted-character wording.
- Present generated images as educational reconstructions, not documentary photographs; include download and expanded-view controls.
- Surface exact safe service errors, stop terminal failures, and use bounded recovery only for temporary rate or service interruptions.

## Technical details
- Add Cloud tables for `journeys`, `journey_messages`, and generated `journey_images`, with timestamps, ownership rules, indexes, grants, and row-level access controls.
- Add server functions for streamed chat and image generation; keep prompts and credentials server-side and persist completed assistant messages only after streaming finishes.
- Use AI Elements for the conversation, markdown messages, composer, thinking state, and collapsed generation details.
- Add route-derived journey IDs, authentication screens, and protected journey loading.
- Add reduced-motion behavior and responsive checks for desktop and mobile.

## Verification
- Test sign-up/sign-in, two separate journeys, message and image persistence, URL reload restoration, new/delete journey behavior, transition effects, factual-source rendering, and mobile layout.
- Run the project checks, inspect the live experience in desktop and mobile viewports, and make one real AI request plus a follow-up before reporting completion.
