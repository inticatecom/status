// Resources
import React from "react";
import {EndpointResponse} from "@/app/api/endpoints/route";

/**
 * Represents the children of a React component.
 * @typeParam Req Whether or not the children prop is required.
 */
export type Children<Req extends boolean> = Req extends boolean ? RequiredChildren : OptionalChildren;

export interface ClassName {
    className?: string;
};

/** Represents the required children of a React component. */
interface RequiredChildren {
    children: React.ReactNode;
}

/** Represents the optional children of a React component. */
interface OptionalChildren {
    children?: React.ReactNode;
}

/** Represents an absolute URL (eg. https://example.com). */
export type URL = `${"http" | "https"}://${string}.${string}`

/** Represents the properties that can be attached to the callout component. */
export type CalloutProps = {
    /** The type of callout to display. */
    type?: "success" | "warning" | "error";
} & Children<true> & ClassName;

export interface StatusCategoryProps extends Children<false> {
    title: string;
    position: "top" | "center" | "bottom";
}

/** Represents the properties of the status entry component. */
export interface StatusEntryProps {
    /** The title of the entry. */
    children: string;
    data: EndpointResponse[keyof EndpointResponse];
}