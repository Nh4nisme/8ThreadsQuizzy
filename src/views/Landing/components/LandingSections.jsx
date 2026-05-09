"use client";

import { forwardRef } from "react";
import { Award, BookOpen, ChartColumnIncreasing } from "lucide-react";

const sectionCards = [
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
];

const LandingSections = forwardRef(function LandingSections(_, ref) {
    return (
        <section
            ref={ref}
            className="w-full bg-zinc-950 px-6 py-20 text-white md:px-10"
        >
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-16">
                <div className="max-w-3xl">
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-400">
                        Explore More
                    </p>
                    <h2 className="mt-4 text-3xl font-semibold md:text-4xl">
                        Built for fast quiz discovery, measurable learning, and repeat engagement.
                    </h2>
                    <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-300">
                        Once users move past the hero, the page should immediately explain what the platform offers and why the flow is worth continuing.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {sectionCards.map(({ icon: Icon, title, description }) => (
                        <article
                            key={title}
                            className="flex min-h-64 flex-col rounded-lg border border-white/10 bg-black/60 p-6"
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
    );
});

export default LandingSections;
