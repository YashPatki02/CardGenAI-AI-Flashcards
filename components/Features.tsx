import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Apple, Award, BicepsFlexed } from "lucide-react";

const Features = () => {
    return (
        <section id="features" className="container flex flex-col items-center gap-6 py-20 sm:gap-7">
            <div className="flex flex-col gap-3">
                <span className="font-bold uppercase text-primary text-center">
                    Features
                </span>
                <h2 className="text-3xl font-heading font-semibold text-center sm:text-4xl">
                    Personalized and Tailored to You
                </h2>
            </div>
            <p className="text-center text-lg max-w-2xl text-muted-foreground">
                Our platform is designed to provide you with the best experience
                possible, so all you need to worry about is achieving your
                goals.
            </p>
            <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
                <Card className="shadow-lg">
                    <CardContent className="flex flex-col items-start gap-4 p-6">
                        <div className="inline-flex items-center justify-center rounded-md border-border bg-secondary p-2">
                            <BicepsFlexed
                                size={28}
                                strokeWidth={3}
                                className="text-primary"
                            />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-foreground mb-2">Personal Training</h3>
                            <p className="text-muted-foreground">
                                Personalized workout plans tailored to your goals.
                            </p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="shadow-lg">
                    <CardContent className="flex flex-col items-start gap-4 p-6">
                        <div className="inline-flex items-center justify-center rounded-md border-border bg-secondary p-2">
                            <Apple
                                size={28}
                                strokeWidth={3}
                                className="text-primary"
                            />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-foreground mb-2">Nutrition</h3>
                            <p className="text-muted-foreground">
                                Personalized nutrition plans tailored to your needs.
                            </p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="shadow-lg">
                    <CardContent className="flex flex-col items-start gap-4 p-6">
                        <div className="inline-flex items-center justify-center rounded-md border-border bg-secondary p-2">
                            <Award
                                size={28}
                                strokeWidth={3}
                                className="text-primary"
                            />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-foreground mb-2">Coaching</h3>
                            <p className="text-muted-foreground">
                                Personalized coaching tailored to your needs.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
};

export default Features;
