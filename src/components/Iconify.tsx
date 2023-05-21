"use client";

import { Icon, IconProps } from "@iconify/react";

interface IconifyProps extends IconProps {}

export function Iconify(props: IconifyProps) {
	return <Icon {...props} />;
}
