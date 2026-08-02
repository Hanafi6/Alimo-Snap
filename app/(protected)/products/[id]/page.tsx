import SingllePoductCage from "@/components/products/SingllePoductCage";
import { ParamValue } from "next/dist/server/request/params";

interface PageProps {
    params: Promise<{ id: ParamValue }>;
}
async function page({ params }: PageProps) {

    const { id } = await params;

    return <SingllePoductCage id={id} />
}

export default page;