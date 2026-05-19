# UX Case Study & Rationale — Apex Plumbing Services

This case study documents the design decisions, user research findings, sitemap architecture, and engineering strategies used to redesign the outdated web presence of **Apex Plumbing & Drain Services**.

---

## 1. Selected Local Business & Heuristic Evaluation
* **Business Type:** Local Residential & Commercial Plumbing, Emergency Sewer & Drain Routing.
* **Target Audience:** Homeowners, commercial landlords, property managers, and people experiencing immediate, active plumbing disasters.

### Heuristic Failures of Existing Competitor Websites:
1. **Hidden or Passive Calls-to-Action (CTAs):** Competitors often place telephone links inside tiny text in footer bars or rely solely on generic static contact forms which fail in emergencies.
2. **"Wall of Text" Layouts:** Outdated web designs bury crucial services (e.g. leak detection vs drain clear) in long, unreadable prose blocks, increasing user bounce rates.
3. **No Pricing Transparency:** High anxiety surrounds contracting home service businesses. Hiding baseline pricing breeds skepticism and slows booking rates.
4. **Poor Mobile Responsiveness:** Over 70% of residential emergencies are researched on smartphones. Unresponsive desktop pages force users to pinch-zoom to dial a phone number.

---

## 2. Target User Persona
* **Name:** Ravi Sharma
* **Age:** 32
* **Occupation:** Software Engineer / First-Time Homeowner
* **Scenario:** Discovers a rapid drip leaking from under the bathroom sink at 11:30 PM.
* **Key Challenges:**
  * Needs immediate assistance before structural flooring is damaged.
  * Researching on a mobile device while actively trying to shut off water lines.
  * Highly anxious about hidden costs, dispatch delays, and plumber trust.
* **Redesign Strategy:** Deliver a mobile-first website featuring a sticky "Call Now" emergency dispatch button, transparent base prices, a fast 30-second multi-step wizard, and immediate tracking updates.

---

## 3. Site Architecture & Layout Blueprint
The redesign follows a highly focused 3-page layout to avoid navigation fatigue and focus strictly on high-intent lead routing:

```
                  ┌─────────────────────────┐
                  │       [ index.html ]    │  ◄── Homepage (Hero, Quick Widget,
                  └────────────┬────────────┘      Testimonials, Lead CTAs)
                               │
            ┌──────────────────┴──────────────────┐
            ▼                                     ▼
 ┌────────────────────┐                ┌────────────────────┐
 │  [ services.html ] │                │   [ contact.html ] │  ◄── Multi-step Wizard
 └──────────┬─────────┘                └────────────────────┘      (Service ➔ Time ➔ Info)
            │                                     ▲
            └─────────────────────────────────────┘
                 Redirect with Pre-Selected Service
```

1. **Home (`index.html`):** The primary brand authority page.
   * *Aesthetic Objective:* Professionalism, modern glassmorphism elements, trusted badges, and an instant booking widget.
2. **Services & Transparent Pricing (`services.html`):**
   * *Features:* Real-time text search filter + quick category filter buttons to isolate relevant work.
   * *Trust Factor:* Upfront "From $X" base pricing displayed prominently for each card.
3. **Interactive Booking Form (`contact.html`):**
   * *The Wizard:* Breaks down appointment creation into frictionless pages to prevent cognitive overload. Includes automated validation and success confirmation.

---

## 4. Brand Design System
To convey clean, reliable, and premium emergency service craftsmanship, we moved completely away from default primary colors and created a custom design palette:

* **Colors:**
  * `Primary Dark (Navy)`: `#0B132B` — Represents structure, cleanliness, and security.
  * `Accent Light (Ice Blue)`: `#1C2541` — Elevates visual depth.
  * `Primary Blue (Water)`: `#3A86FF` — Reflects liquid flow, technology, and fluid power.
  * `Primary Orange (Alert/CTA)`: `#FB5607` — Directs focus immediately to key actions without causing screen stress.
* **Typography:**
  * *Headings:* `Poppins` (Sans-Serif, Semi-Bold / Bold) — Open, clean, geometric letterforms that establish trust instantly.
  * *Body text:* `Inter` — Highly legible, modern, functional font that preserves spacing on dense cards.
* **Animations:**
  * Clean, 250ms transitions on card hovers, button glows, and input field focuses.
  * Sleek progress bar expansion in the multi-step form to incentivize booking completion.
