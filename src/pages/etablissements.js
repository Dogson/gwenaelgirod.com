import React from "react"
import PageLayout from "../layouts/pageLayout";
import SectionLayout from "../layouts/sectionLayout"

const SchoolPage = () => (
    <PageLayout>
        <SectionLayout title="Etablissements" odd>
            <div> Les établissements </div>
        </SectionLayout>
    </PageLayout>
);

export default SchoolPage;