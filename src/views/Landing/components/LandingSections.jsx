"use client";

import { forwardRef, useEffect, useRef } from "react";
import {
  Award,
  BookOpen,
  ChartColumnIncreasing,
  CircleCheckBig,
  Gift,
  Globe,
  Sparkles,
  Users,
} from "lucide-react";

const sections = [
  {
    id: "quiz",
    eyebrow: "Explore More",
    title:
      "Built for fast quiz discovery, measurable learning, and repeat engagement.",
    description:
      "Once users move past the hero, the page should immediately explain what the platform offers and why the flow is worth continuing.",
    cards: [
      {
        icon: BookOpen,
        title: "Interactive Quiz Library",
        description:
          "Browse curated quizzes across core subjects with fast previews, clean question flows, and classroom-ready formats.",
      },
      {
        icon: ChartColumnIncreasing,
        title: "Progress That Is Easy To Track",
        description:
          "Follow completion rates, identify weak areas, and compare learning outcomes without forcing users through a heavy dashboard first.",
      },
      {
        icon: Award,
        title: "Rewards That Keep Learners Engaged",
        description:
          "Turn each quiz run into a simple progression loop with rankings, milestones, and visible achievements that encourage repeat participation.",
      },
    ],
  },
  {
    id: "weekly-quiz",
    eyebrow: "Weekly Quiz",
    title: "Recurring challenge formats that keep classrooms returning each week.",
    description:
      "Weekly quiz cycles should feel scheduled and dependable, with enough variation to keep the experience fresh for both teachers and students.",
    cards: [
      {
        icon: Sparkles,
        title: "Fresh themed drops",
        description:
          "Release new quiz sets on a steady cadence with topic-based packaging that helps users know what is worth opening next.",
      },
      {
        icon: CircleCheckBig,
        title: "Quick participation flow",
        description:
          "Students can join, complete, and submit with minimal friction, which matters more than adding extra steps or decorative screens.",
      },
      {
        icon: Globe,
        title: "Cross-class comparisons",
        description:
          "Track how each group performs week to week and surface trends without turning the page into a dense analytics product.",
      },
    ],
  },
  {
    id: "rewards",
    eyebrow: "Rewards",
    title: "A visible reward system that makes progress feel earned, not random.",
    description:
      "Recognition works better when users understand what they are progressing toward, how they unlocked it, and what they should do next.",
    cards: [
      {
        icon: Gift,
        title: "Milestone rewards",
        description:
          "Define clear unlock points for streaks, completion, and high scores so learners have reasons to stay consistent.",
      },
      {
        icon: Award,
        title: "Rankings with context",
        description:
          "Leaderboard placement is more useful when paired with recent gains, completion quality, and other signals beyond raw score.",
      },
      {
        icon: Users,
        title: "Team motivation",
        description:
          "Support collaborative challenge loops with shared targets that encourage participation from the entire group.",
      },
    ],
  },
  {
    id: "about",
    eyebrow: "About",
    title: "A quiz platform designed for structured learning, not empty activity.",
    description:
      "The landing page should close by explaining the product stance clearly: practical for educators, simple for students, and focused on repeat use.",
    cards: [
      {
        icon: Users,
        title: "Teacher-first workflows",
        description:
          "Creation, distribution, and review should stay efficient enough for real classroom usage instead of demo-only scenarios.",
      },
      {
        icon: ChartColumnIncreasing,
        title: "Actionable performance data",
        description:
          "Surface the signals that influence intervention decisions without overwhelming users with unnecessary reporting layers.",
      },
      {
        icon: BookOpen,
        title: "Consistent learning loops",
        description:
          "Keep students in a rhythm of discover, attempt, review, and improve so the product supports progress over time.",
      },
    ],
  },
];

const LandingSections = forwardRef(function LandingSections(_, ref) {
  const sectionsWrapperRef = useRef(null);

  useEffect(() => {
    const root = sectionsWrapperRef.current;

    if (!root) {
      return undefined;
    }

    const revealItems = root.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );

    revealItems.forEach((item) => observer.observe(item));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={sectionsWrapperRef} className="w-full bg-zinc-950 text-white">
      {sections.map((section, index) => (
        <section
          key={section.id}
          id={section.id}
          ref={index === 0 ? ref : null}
          className="scroll-mt-24 px-6 py-20 md:px-10"
        >
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-16">
            <div className="max-w-3xl">
              <p
                data-reveal
                className="reveal-item text-sm font-medium uppercase tracking-[0.2em] text-purple-400"
              >
                {section.eyebrow}
              </p>
              <h2
                data-reveal
                className="reveal-item reveal-delay-1 mt-4 text-3xl font-semibold md:text-4xl"
              >
                {section.title}
              </h2>
              <p
                data-reveal
                className="reveal-item reveal-delay-2 mt-5 max-w-2xl text-base leading-7 text-zinc-300"
              >
                {section.description}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {section.cards.map(({ icon: Icon, title, description }, cardIndex) => (
                <article
                  key={title}
                  data-reveal
                  className="reveal-item flex min-h-64 flex-col rounded-lg border border-white/10 bg-black/60 p-6"
                  style={{ transitionDelay: `${cardIndex * 120}ms` }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-orange-500">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold">{title}</h3>
                  <p className="mt-4 text-sm leading-7 text-zinc-300">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
});

export default LandingSections;
