import React from "react";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Testimonials = () => {
    return (
        <section className="container flex flex-col items-center gap-6 py-20 sm:gap-7">
            <div className="flex flex-col gap-3">
                <span className="font-bold uppercase text-primary text-center">
                    Testimonials
                </span>
                <h2 className="text-3xl font-heading font-semibold text-center sm:text-4xl">
                    What our users say
                </h2>
            </div>
            <p className="text-center text-lg max-w-2xl text-muted-foreground">
                Our users love CardGenAI. Here's what they have to say about us.
            </p>
            <div className="mt-1 columns-1 gap-5 md:columns-2 lg:columns-3">
                <Card className="mt-7 inline-block break-inside-avoid shadow-lg">
                    <CardContent className="flex flex-col items-start gap-4 p-6 divide-y">
                        <p className="text-foreground">
                            "I love CardGenAI! It's so easy to use and has
                            helped me ace my exams."
                        </p>
                        <div className="flex itces-center gap-4 w-full pt-4">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <p className="font-semibold leading-none text-foreground">
                                    Shad
                                </p>
                                <p className="text-muted-foreground">Student</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="mt-7 inline-block break-inside-avoid shadow-lg">
                    <CardContent className="flex flex-col items-start gap-4 p-6 divide-y">
                        <p className="text-foreground">
                            "I love CardGenAI! It's so easy to use and has
                            helped me ace my exams."
                        </p>
                        <div className="flex itces-center gap-4 w-full pt-4">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <p className="font-semibold leading-none text-foreground">
                                    Shad
                                </p>
                                <p className="text-muted-foreground">Student</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="mt-7 inline-block break-inside-avoid shadow-lg">
                    <CardContent className="flex flex-col items-start gap-4 p-6 divide-y">
                        <p className="text-foreground">
                            "I love CardGenAI! It's so easy to use and has
                            helped me ace my exams. I love the feature with the AI."
                        </p>
                        <div className="flex itces-center gap-4 w-full pt-4">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <p className="font-semibold leading-none text-foreground">
                                    Shad
                                </p>
                                <p className="text-muted-foreground">Student</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="mt-7 inline-block break-inside-avoid shadow-lg">
                    <CardContent className="flex flex-col items-start gap-4 p-6 divide-y">
                        <p className="text-foreground">
                            "I love CardGenAI! It's so easy to use and has
                            helped me ace my exams. I have been using it for a
                            while now and it has helped me a lot."
                        </p>
                        <div className="flex itces-center gap-4 w-full pt-4">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <p className="font-semibold leading-none text-foreground">
                                    Shad
                                </p>
                                <p className="text-muted-foreground">Student</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="mt-7 inline-block break-inside-avoid shadow-lg">
                    <CardContent className="flex flex-col items-start gap-4 p-6 divide-y">
                        <p className="text-foreground">
                            "I love CardGenAI! It's so easy to use and has
                            helped me ace my exams."
                        </p>
                        <div className="flex itces-center gap-4 w-full pt-4">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <p className="font-semibold leading-none text-foreground">
                                    Shad
                                </p>
                                <p className="text-muted-foreground">Student</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="mt-7 inline-block break-inside-avoid shadow-lg">
                    <CardContent className="flex flex-col items-start gap-4 p-6 divide-y">
                        <p className="text-foreground">
                            "I love CardGenAI! It's so easy to use and has
                            helped me ace my exams."
                        </p>
                        <div className="flex itces-center gap-4 w-full pt-4">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <p className="font-semibold leading-none text-foreground">
                                    Shad
                                </p>
                                <p className="text-muted-foreground">Student</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
};

export default Testimonials;
