import SiteLayout from "@/components/SiteLayout";
import PageHero from "@/components/PageHero";

const RED = "#d4af37";

export default function CookiePage() {
  return (
    <SiteLayout activePage="/cookie">
      <PageHero title="Cookie Policy" breadcrumb="Home / Cookie Policy" />

      <section style={{ backgroundColor: "#fff", padding: "60px 0" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 15px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "8px" }}>Cookie Policy</h2>
          <div style={{ width: "40px", height: "3px", backgroundColor: RED, marginBottom: "28px" }} />

          {[
            {
              title: "What Are Cookies",
              body: "As is common practice with almost all professional websites, this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it and why we sometimes need to store these cookies.",
            },
            {
              title: "How We Use Cookies",
              body: "We use cookies for a variety of reasons detailed below. Unfortunately in most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use.",
            },
            {
              title: "Disabling Cookies",
              body: "You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. Disabling cookies will usually result in also disabling certain functionality and features of this site. Therefore it is recommended that you do not disable cookies.",
            },
            {
              title: "The Cookies We Set",
              body: "When you submit data to us through a form such as those found on contact pages or comment forms, cookies may be set to remember your user details for future correspondence. In order to provide you with a great experience on this site we provide the functionality to set your preferences for how this site runs when you use it.",
            },
            {
              title: "Third Party Cookies",
              body: "In some special cases we also use cookies provided by trusted third parties. The following section details which third party cookies you might encounter through this site. This site uses Google Analytics which is one of the most widespread and trusted analytics solutions on the web for helping us to understand how you use the site.",
            },
            {
              title: "More Information",
              body: "Hopefully that has clarified things for you and as was previously mentioned if there is something that you aren't sure whether you need or not it's usually safer to leave cookies enabled in case it does interact with one of the features you use on our site. If you are still looking for more information then you can contact us through one of our preferred contact methods.",
            },
          ].map((section) => (
            <div key={section.title} style={{ marginBottom: "28px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#222", marginBottom: "10px" }}>{section.title}</h3>
              <p style={{ fontSize: "13px", color: "#666", lineHeight: "1.9" }}>{section.body}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
