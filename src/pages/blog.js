import React from "react"
import PageLayout from "../layouts/pageLayout";
import SectionLayout from "../layouts/sectionLayout"

const BlogPage = () => (
    <PageLayout>
        <SectionLayout title="Blog" odd>
            <div> Le blog </div>
        </SectionLayout>
    </PageLayout>
);

export default BlogPage;