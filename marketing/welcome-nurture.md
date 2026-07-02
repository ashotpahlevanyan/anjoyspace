# Welcome Nurture Sequence (MailerLite)

A 4-email welcome flow for new subscribers (both the newsletter form and the
`/free/` opt-in add to the same MailerLite group, so both trigger this).

## Setup (MailerLite UI — automations can't be created via API)

1. **Automations → Create workflow** → name `Welcome — Nidra guide`.
2. **Trigger:** *When a subscriber joins a group* → the website group (`191857759826740723`).
3. Steps in order: **Email 1** → Delay 3 days → **Email 2** → Delay 3 days → **Email 3** → Delay 3 days → **Email 4**.
4. Set the workflow **Active**.

**Prerequisites:** verify sender `hello@anjoy.space` (SPF/DKIM) under Settings → Domains; keep **double opt-in OFF** for this group so API-added subscribers enter the flow.

Each email is bilingual — paste the Russian block, a divider, then the English block.

---

## Email 1 — immediate

**Subject (RU):** Ваш гид по йога-нидре 🌙
**Subject (EN):** Your Yoga Nidra guide 🌙

Здравствуйте!
Спасибо, что вы с нами. Вот ваш бесплатный гид по йога-нидре — простая практика глубокого отдыха на пять шагов:
👉 https://anjoy.space/free/nidra-guide/
Совет: начните с десяти минут вечером, без телефона. Регулярность важнее длительности.
С теплом, Ани и команда Anjoy

⸻

Hi,
Thank you for being here. Here's your free Yoga Nidra guide — a simple five-step deep-rest practice:
👉 https://anjoy.space/free/nidra-guide/
A tip: start with ten minutes in the evening, no phone. Consistency matters more than duration.
Warmly, Ani & the Anjoy team

---

## Email 2 — after 3 days

**Subject (RU):** Как превратить нидру в привычку
**Subject (EN):** Making Yoga Nidra a habit

Как прошла первая практика?
Маленький секрет: привяжите нидру к тому, что уже делаете каждый день — например, сразу после того как легли в кровать. Не старайтесь уснуть и не старайтесь бодрствовать. Просто оставайтесь рядом с ощущениями.
Если хочется глубже — попробуйте практику через день в течение недели и понаблюдайте, как меняется сон.

⸻

How did the first practice go?
A small secret: attach Nidra to something you already do daily — like right after you lie down in bed. Don't try to fall asleep and don't try to stay awake. Just stay near the sensations.
Want to go deeper? Try it every other day for a week and notice how your sleep shifts.

---

## Email 3 — after 3 more days

**Subject (RU):** Почему мы строим ретриты вокруг отдыха
**Subject (EN):** Why we build our retreats around rest

Йога-нидра — в сердце каждого нашего ретрита. Мы поняли простую вещь: динамичная практика раскрывает тело, а глубокий отдых учит его отпускать. Без второго первое становится ещё одной формой усилия.
Именно поэтому наши ретриты — небольшие группы, тишина и намеренное чередование движения и покоя.
Если однажды захотите почувствовать это вживую — посмотрите ближайшие даты:
👉 https://anjoy.space/#retreats

⸻

Yoga Nidra sits at the heart of every retreat we run. We learned something simple: dynamic practice opens the body, while deep rest teaches it to let go. Without the second, the first becomes just another form of effort.
That's why our retreats are small groups, silence, and a deliberate rhythm of movement and stillness.
If you'd ever like to feel it in person, see the upcoming dates:
👉 https://anjoy.space/#retreats

---

## Email 4 — after 3 more days (story + booking nudge)

**Subject (RU):** «Я не думала, что смогу так остановиться»
**Subject (EN):** "I didn't think I could slow down like that"

За годы ретритов мы снова и снова слышим одно и то же: люди приезжают уставшими и настороженными, а уезжают — мягкими и собранными.
Вот что рассказала одна из участниц:
«[вставьте реальный отзыв участницы]»
Если внутри есть тихое «а что, если и мне…» — доверьтесь ему. Группы у нас небольшие (8–16 человек), и места разбираются быстро. Напишите нам — ответим в течение 24 часов и поможем выбрать подходящий ретрит.
👉 https://anjoy.space/#retreats

⸻

Over the years we hear the same thing again and again: people arrive tired and guarded, and leave soft and gathered.
Here's what one participant told us:
"[insert a real participant quote]"
If there's a quiet "what if I…" inside, trust it. Our groups are small (8–16 people) and spots fill quickly. Write to us — we'll reply within 24 hours and help you find the right retreat.
👉 https://anjoy.space/#retreats

> **Note:** replace the bracketed quotes in Email 4 with a real testimonial
> (e.g. from the Deep Yoga Weekend reviews) — real words convert, and avoid
> putting fabricated quotes in front of prospects.
