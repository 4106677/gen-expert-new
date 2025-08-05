// src/app/equipment/[id]/page.js
'use client';

import EquipmentDetailPageClient from "@/app/equipment/[id]/EquipmentDetailPageClient";
import { useParams } from "next/navigation";

export default function EquipmentDetailPage() {
	const { id } = useParams();
	return <EquipmentDetailPageClient id={id} />;
}