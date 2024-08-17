import React from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
    return (
        <section className="container flex flex-col items-center gap-6 py-20 sm:gap-7">
            <div className="flex flex-col gap-3">
                <span className="font-bold uppercase text-primary text-center">
                    FAQ
                </span>
                <h2 className="text-3xl font-heading font-semibold text-center sm:text-4xl">
                    Frequently Asked Questions
                </h2>
            </div>
            <p className="text-center text-lg max-w-2xl text-muted-foreground">
                For any questions, feel free to reach out to us. We're here to
                help.
            </p>
            <Accordion
                type="multiple"
                className="mt-6 w-full divide-y max-w-3xl"
            >
                <AccordionItem value="item-1" className="border-b-0">
                    <AccordionTrigger className="py-6 text-left text-lg hover:no-underline">
                        How do I get started?
                    </AccordionTrigger>
                    <AccordionContent className="text-lg text-muted-foreground">
                        Getting started is easy! Simply create an account and
                        you're good to go.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="border-b-0">
                    <AccordionTrigger className="py-6 text-left text-lg hover:no-underline">
                        How do I create flashcards?
                    </AccordionTrigger>
                    <AccordionContent className="text-lg text-muted-foreground">
                        You can create flashcards by clicking on the "Create
                        Flashcards" button.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="border-b-0">
                    <AccordionTrigger className="py-6 text-left text-lg hover:no-underline">
                        How do I access the public library?
                    </AccordionTrigger>
                    <AccordionContent className="text-lg text-muted-foreground">
                        You can access the public library by clicking on the
                        "Public Library" button.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="border-b-0">
                    <AccordionTrigger className="py-6 text-left text-lg hover:no-underline">
                        How do I share my flashcards?
                    </AccordionTrigger>
                    <AccordionContent className="text-lg text-muted-foreground">
                        You can share your flashcards by clicking on the "Share"
                        button.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </section>
    );
};

export default FAQ;
