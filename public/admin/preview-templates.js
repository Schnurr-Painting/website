/*
 * Custom Decap CMS preview templates.
 *
 * Loaded via plain <script> tag (no build step, no JSX) - uses Decap's own
 * globally-exposed h (React.createElement alias), NOT a separately loaded
 * copy of React. An earlier version of this file loaded React/ReactDOM via
 * CDN, which caused "Minified React error #525" - Decap CMS bundles its own
 * React internally and exposes h/createClass specifically so consumers
 * never need to bring a second copy. Do not add React/ReactDOM <script>
 * tags to admin/index.html; use the global h instead.
 *
 * Styling reuses the real site's actual CSS custom properties (loaded via
 * CMS.registerPreviewStyle pointing at the same global.css the live site
 * uses) rather than reinventing colors/fonts here - so if the brand tokens
 * ever change, these previews stay in sync automatically.
 *
 * Phase 1 scope: Positions, Team, Testimonials - the three collections
 * seeing active use. Pages/Services/Markets/Projects/Resources/Site
 * Settings still use Decap's default preview for now (see
 * PRE-LAUNCH-CHECKLIST.md).
 */

CMS.registerPreviewStyle('/styles/global.css');
// h (React.createElement alias) is exposed globally by decap-cms.js itself -
// deliberately not declared here. An earlier version of this file loaded a
// separate copy of React via CDN and declared its own h, which caused
// "Minified React error #525" (multiple React instances rendering elements
// created by a different copy than the one Decap uses internally to mount
// the preview pane). Decap's own docs specifically expose h/createClass for
// this exact reason - use those, don't bring your own React.

var styles = {
  wrapper: {
    fontFamily: 'var(--body-font)',
    color: 'var(--ink)',
    padding: '32px',
    maxWidth: '640px',
  },
  warning: {
    background: '#fdf3e7',
    border: '1px solid #e3b774',
    color: '#7a4a12',
    padding: '10px 14px',
    fontSize: '13px',
    fontWeight: 600,
    marginBottom: '20px',
    borderRadius: '3px',
  },
  badgeRow: {
    display: 'flex',
    gap: '12px',
    marginBottom: '10px',
    flexWrap: 'wrap',
  },
  badge: {
    fontFamily: 'var(--utility)',
    fontWeight: 700,
    fontSize: '12px',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color: 'var(--gold)',
  },
  mutedBadge: {
    fontFamily: 'var(--utility)',
    fontWeight: 700,
    fontSize: '12px',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color: 'var(--body)',
  },
  h2: {
    fontFamily: 'var(--display)',
    fontSize: '26px',
    fontWeight: 600,
    margin: '0 0 16px',
    color: 'var(--ink)',
  },
  h3: {
    fontFamily: 'var(--utility)',
    fontWeight: 700,
    fontSize: '13px',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color: 'var(--ink)',
    margin: '24px 0 8px',
  },
  body: {
    fontSize: '15px',
    lineHeight: 1.6,
  },
  list: {
    margin: 0,
    paddingLeft: '20px',
    fontSize: '14.5px',
    lineHeight: 1.7,
  },
  card: {
    display: 'flex',
    gap: '20px',
    alignItems: 'flex-start',
  },
  photo: {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '4px',
    background: 'var(--cream)',
    flexShrink: 0,
  },
  name: {
    fontFamily: 'var(--display)',
    fontSize: '22px',
    fontWeight: 600,
    margin: '0 0 4px',
  },
  role: {
    fontFamily: 'var(--utility)',
    fontWeight: 700,
    fontSize: '13px',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    color: 'var(--gold)',
    margin: '0 0 12px',
  },
  bio: {
    fontSize: '14.5px',
    lineHeight: 1.6,
    color: 'var(--body)',
    margin: 0,
  },
  quote: {
    fontFamily: 'var(--display)',
    fontStyle: 'italic',
    fontSize: '20px',
    lineHeight: 1.5,
    margin: '0 0 16px',
    paddingLeft: '20px',
    borderLeft: '3px solid var(--gold)',
  },
  attrib: {
    fontFamily: 'var(--utility)',
    fontWeight: 700,
    fontSize: '13px',
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    color: 'var(--ink)',
    margin: '0 0 8px',
  },
  muted: {
    fontSize: '13px',
    color: 'var(--body)',
  },
  hero: {
    position: 'relative',
    minHeight: '220px',
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    marginBottom: '4px',
  },
  heroOverlay: {
    position: 'absolute',
    inset: 0,
  },
  heroContent: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '480px',
  },
  heroEyebrow: {
    fontFamily: 'var(--utility)',
    fontWeight: 700,
    fontSize: '12px',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },
  heroTitle: {
    fontFamily: 'var(--display)',
    fontSize: '32px',
    fontWeight: 600,
    margin: '10px 0 0',
    lineHeight: 1.1,
  },
  heroIntro: {
    fontSize: '15px',
    lineHeight: 1.5,
    margin: '12px 0 0',
    opacity: 0.9,
  },
  sectionBlock: {
    padding: '20px 32px',
    borderBottom: '1px solid var(--line)',
  },
  swatchRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '14px',
    padding: '0 32px 24px',
  },
  swatch: {
    textAlign: 'center',
    fontSize: '11px',
    fontFamily: 'var(--utility)',
  },
  swatchBox: {
    width: '48px',
    height: '48px',
    borderRadius: '4px',
    border: '1px solid var(--line)',
    marginBottom: '4px',
  },
  thumbRow: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
    padding: '0 32px 24px',
  },
  thumb: {
    width: '70px',
    height: '70px',
    objectFit: 'cover',
    borderRadius: '3px',
  },
  fieldTable: {
    padding: '0 32px 24px',
    fontSize: '14px',
  },
  fieldRow: {
    display: 'flex',
    gap: '12px',
    padding: '6px 0',
    borderBottom: '1px solid var(--line)',
  },
  fieldLabel: {
    fontFamily: 'var(--utility)',
    fontWeight: 700,
    fontSize: '11px',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    color: 'var(--body)',
    width: '140px',
    flexShrink: 0,
  },
};

function toArray(val) {
  if (!val) return [];
  if (typeof val.toJS === 'function') return val.toJS();
  if (Array.isArray(val)) return val;
  return [];
}

// Shared hero block reused across every page-hero preview (standard pages,
// About/Safety, Home, and content-collection detail heroes). Renders a
// background photo (if set) with a color overlay and the eyebrow/title/intro
// text on top - roughly matching InteriorHero.astro's actual layout without
// trying to be pixel-perfect.
function renderHeroBlock(opts) {
  var bg = opts.image
    ? { backgroundImage: 'url(' + opts.image + ')' }
    : { backgroundColor: opts.backgroundColor || 'var(--navy)' };
  var overlayColor = opts.overlayColor || opts.backgroundColor || 'var(--navy)';
  var overlayOpacity = opts.overlayOpacity != null ? opts.overlayOpacity : 0.75;

  return h(
    'div',
    { style: Object.assign({}, styles.hero, bg) },
    opts.image &&
      h('div', {
        style: Object.assign({}, styles.heroOverlay, {
          backgroundColor: overlayColor,
          opacity: overlayOpacity,
        }),
      }),
    h(
      'div',
      { style: Object.assign({}, styles.heroContent, { color: opts.headingColor || '#fff' }) },
      opts.eyebrow && h('p', { style: Object.assign({}, styles.heroEyebrow, { color: opts.accentColor || 'inherit' }) }, opts.eyebrow),
      h('h1', { style: styles.heroTitle }, opts.title),
      opts.intro && h('p', { style: Object.assign({}, styles.heroIntro, { color: opts.introColor || 'inherit' }) }, opts.intro)
    )
  );
}

function PositionPreview(props) {
  var entry = props.entry;
  var title = entry.getIn(['data', 'title']) || 'Untitled Position';
  var roleType = entry.getIn(['data', 'roleType']);
  var employmentType = entry.getIn(['data', 'employmentType']);
  var location = entry.getIn(['data', 'location']);
  var active = entry.getIn(['data', 'active']);
  var requirementsRaw = entry.getIn(['data', 'requirements']) || '';
  var requirements = requirementsRaw.split('\n').map(function (s) { return s.trim(); }).filter(Boolean);

  return h(
    'div',
    { style: styles.wrapper },
    active === false &&
      h('div', { style: styles.warning }, '\u26A0 Marked inactive \u2014 will not show on the live Careers page'),
    h(
      'div',
      { style: styles.badgeRow },
      roleType && h('span', { style: styles.badge }, roleType),
      employmentType && h('span', { style: styles.badge }, employmentType),
      location && h('span', { style: styles.mutedBadge }, location)
    ),
    h('h2', { style: styles.h2 }, title),
    h('div', { style: styles.body }, props.widgetFor('body')),
    requirements.length > 0 &&
      h(
        'div',
        null,
        h('h3', { style: styles.h3 }, 'Requirements'),
        h('ul', { style: styles.list }, requirements.map(function (r, i) { return h('li', { key: i }, r); }))
      )
  );
}

function TeamPreview(props) {
  var entry = props.entry;
  var name = entry.getIn(['data', 'name']) || 'Unnamed';
  var role = entry.getIn(['data', 'role']);
  var bio = entry.getIn(['data', 'bio']);
  var headshot = entry.getIn(['data', 'headshot']);
  var publicProfile = entry.getIn(['data', 'publicProfile']);
  var imgUrl = headshot ? props.getAsset(headshot).toString() : null;

  return h(
    'div',
    { style: styles.wrapper },
    publicProfile === false &&
      h('div', { style: styles.warning }, '\u26A0 "Show on About Page" is off \u2014 hidden from the live site'),
    h(
      'div',
      { style: styles.card },
      imgUrl ? h('img', { src: imgUrl, style: styles.photo }) : h('div', { style: styles.photo }),
      h(
        'div',
        null,
        h('h2', { style: styles.name }, name),
        role && h('p', { style: styles.role }, role),
        bio && h('p', { style: styles.bio }, bio)
      )
    )
  );
}

function TestimonialPreview(props) {
  var entry = props.entry;
  var quote = entry.getIn(['data', 'quote']) || '';
  var person = entry.getIn(['data', 'person']);
  var role = entry.getIn(['data', 'role']);
  var company = entry.getIn(['data', 'company']);
  var approved = entry.getIn(['data', 'approvedPublic']);
  var showOn = toArray(entry.getIn(['data', 'showOn']));
  var attribution = [person, role, company].filter(Boolean).join(', ');

  return h(
    'div',
    { style: styles.wrapper },
    approved !== true &&
      h(
        'div',
        { style: styles.warning },
        '\u26A0 Not approved for public site \u2014 will not show anywhere until "Approved for Public Site" is on'
      ),
    h('blockquote', { style: styles.quote }, '\u201C' + quote + '\u201D'),
    attribution && h('p', { style: styles.attrib }, attribution),
    showOn.length > 0 && h('p', { style: styles.muted }, 'Shows on: ' + showOn.join(', '))
  );
}

// ---------- Pages collection: standard hero-only pages ----------
// services_page, markets_page, projects_page, resources_page, careers_page,
// contact_page all share the exact same field structure (title,
// seoDescription, hero only - see *standard_page_fields in config.yml).
function HeroOnlyPagePreview(props) {
  var entry = props.entry;
  var hero = entry.getIn(['data', 'hero']);
  if (!hero) return h('div', { style: styles.wrapper }, 'No hero content yet.');

  var imageAsset = hero.get('image') ? props.getAsset(hero.get('image')) : null;

  return h(
    'div',
    null,
    renderHeroBlock({
      image: imageAsset ? imageAsset.toString() : null,
      backgroundColor: hero.get('backgroundColor'),
      overlayColor: hero.get('overlayColor'),
      overlayOpacity: hero.get('overlayOpacity'),
      headingColor: hero.get('headingColor'),
      introColor: hero.get('introColor'),
      accentColor: hero.get('accentColor'),
      eyebrow: hero.get('eyebrow'),
      title: hero.get('title'),
      intro: hero.get('intro'),
    })
  );
}

// ---------- Pages collection: hero + sections (About, Safety) ----------
function HeroWithSectionsPagePreview(props) {
  var entry = props.entry;
  var hero = entry.getIn(['data', 'hero']);
  var sections = toArray(entry.getIn(['data', 'sections']));

  return h(
    'div',
    null,
    hero &&
      renderHeroBlock({
        image: hero.get('image') ? props.getAsset(hero.get('image')).toString() : null,
        backgroundColor: hero.get('backgroundColor'),
        overlayColor: hero.get('overlayColor'),
        overlayOpacity: hero.get('overlayOpacity'),
        headingColor: hero.get('headingColor'),
        introColor: hero.get('introColor'),
        accentColor: hero.get('accentColor'),
        eyebrow: hero.get('eyebrow'),
        title: hero.get('title'),
        intro: hero.get('intro'),
      }),
    sections.length > 0 &&
      h(
        'div',
        { style: styles.wrapper },
        sections.map(function (s, i) {
          return h(
            'div',
            { key: i, style: { marginBottom: '18px' } },
            h('h3', { style: styles.h2 }, s.title),
            h('p', { style: styles.body }, s.copy)
          );
        })
      )
  );
}

// ---------- Pages collection: Home (the big one) ----------
function HomePreview(props) {
  var entry = props.entry;
  var hero = entry.getIn(['data', 'hero']);
  var stats = toArray(entry.getIn(['data', 'stats']));
  var slides = toArray(hero ? hero.get('slides') : null);
  var firstSlideImage = slides.length > 0 && slides[0].image ? props.getAsset(slides[0].image) : null;

  var sectionKeys = [
    ['servicesSection', 'Services Section'],
    ['marketsSection', 'Markets Section'],
    ['projectsSection', 'Featured Projects Section'],
    ['testimonialsSection', 'Testimonials Section'],
    ['requestBidSection', 'Request a Bid Section'],
  ];

  return h(
    'div',
    null,
    hero &&
      renderHeroBlock({
        image: firstSlideImage ? firstSlideImage.toString() : null,
        backgroundColor: hero.get('backgroundColor'),
        overlayColor: hero.get('backgroundColor'),
        overlayOpacity: 0.55,
        headingColor: hero.get('headingColor'),
        introColor: hero.get('introColor'),
        accentColor: hero.get('eyebrowColor'),
        eyebrow: hero.get('eyebrow'),
        title: [hero.get('headingLine1'), hero.get('headingLine2'), hero.get('headingLine3')].filter(Boolean).join(' '),
        intro: hero.get('intro'),
      }),
    slides.length > 1 &&
      h('p', { style: Object.assign({}, styles.muted, { padding: '8px 32px 0' }) }, '+ ' + (slides.length - 1) + ' more hero slide(s) not shown here'),
    stats.length > 0 &&
      h(
        'div',
        { style: styles.sectionBlock },
        h('h3', { style: styles.h3 }, 'Stats'),
        h(
          'div',
          { style: { display: 'flex', gap: '20px', flexWrap: 'wrap' } },
          stats.map(function (s, i) {
            return h(
              'div',
              { key: i, style: { textAlign: 'center' } },
              h('div', { style: { fontFamily: 'var(--display)', fontSize: '22px', fontWeight: 700 } }, s.value),
              h('div', { style: { fontSize: '11px', color: 'var(--body)', maxWidth: '100px' } }, s.label || s.description)
            );
          })
        )
      ),
    sectionKeys.map(function (pair) {
      var section = entry.getIn(['data', pair[0]]);
      if (!section) return null;
      return h(
        'div',
        { key: pair[0], style: styles.sectionBlock },
        h('h3', { style: styles.h3 }, pair[1]),
        h('p', { style: { fontFamily: 'var(--utility)', fontSize: '11px', fontWeight: 700, color: 'var(--gold)', textTransform: 'uppercase', margin: '0 0 4px' } }, section.get('eyebrow')),
        h('p', { style: { fontFamily: 'var(--display)', fontSize: '18px', fontWeight: 600, margin: 0 } }, section.get('heading')),
        section.get('intro') && h('p', { style: { fontSize: '13.5px', color: 'var(--body)', margin: '6px 0 0' } }, section.get('intro'))
      );
    })
  );
}

// ---------- Content collections ----------
function ServicePreview(props) {
  var entry = props.entry;
  var img = entry.getIn(['data', 'heroImage']);
  var imgUrl = img ? props.getAsset(img).toString() : null;
  return h(
    'div',
    { style: styles.wrapper },
    entry.getIn(['data', 'featured']) && h('div', { style: styles.badge }, '\u2605 Featured on Homepage'),
    h('h2', { style: styles.h2 }, entry.getIn(['data', 'title'])),
    h('p', { style: styles.body }, entry.getIn(['data', 'shortDescription'])),
    imgUrl && h('img', { src: imgUrl, style: { width: '100%', maxWidth: '400px', borderRadius: '4px', marginTop: '14px' } }),
    h('div', { style: { marginTop: '18px' } }, props.widgetFor('body'))
  );
}

function MarketPreview(props) {
  var entry = props.entry;
  var img = entry.getIn(['data', 'cardImage']) || entry.getIn(['data', 'heroImage']);
  var imgUrl = img ? props.getAsset(img).toString() : null;
  var accent = entry.getIn(['data', 'accentColor']);
  return h(
    'div',
    { style: styles.wrapper },
    entry.getIn(['data', 'featured']) && h('div', { style: styles.badge }, '\u2605 Featured on Homepage'),
    h(
      'div',
      { style: { display: 'flex', alignItems: 'center', gap: '10px' } },
      accent && h('span', { style: { width: '14px', height: '14px', borderRadius: '50%', background: accent, display: 'inline-block' } }),
      h('h2', { style: Object.assign({}, styles.h2, { margin: 0 }) }, entry.getIn(['data', 'title']))
    ),
    h('p', { style: Object.assign({}, styles.body, { marginTop: '10px' }) }, entry.getIn(['data', 'shortDescription'])),
    imgUrl && h('img', { src: imgUrl, style: { width: '100%', maxWidth: '400px', borderRadius: '4px', marginTop: '14px' } }),
    h('div', { style: { marginTop: '18px' } }, props.widgetFor('body'))
  );
}

function ProjectPreview(props) {
  var entry = props.entry;
  var img = entry.getIn(['data', 'featuredImage']);
  var imgUrl = img ? props.getAsset(img).toString() : null;
  var gallery = toArray(entry.getIn(['data', 'gallery']));
  var services = toArray(entry.getIn(['data', 'services']));
  var facts = [
    ['Market', entry.getIn(['data', 'market'])],
    ['Location', entry.getIn(['data', 'location'])],
    ['General Contractor', entry.getIn(['data', 'gc'])],
    ['Owner', entry.getIn(['data', 'owner'])],
    ['Project Size', entry.getIn(['data', 'projectSize'])],
    ['Completion', entry.getIn(['data', 'completionDate'])],
  ].filter(function (f) { return f[1]; });

  return h(
    'div',
    { style: styles.wrapper },
    entry.getIn(['data', 'featured']) && h('div', { style: styles.badge }, '\u2605 Featured on Homepage'),
    h('h2', { style: styles.h2 }, entry.getIn(['data', 'title'])),
    h('p', { style: styles.body }, entry.getIn(['data', 'shortDescription'])),
    imgUrl && h('img', { src: imgUrl, style: { width: '100%', maxWidth: '400px', borderRadius: '4px', margin: '14px 0' } }),
    gallery.length > 0 &&
      h(
        'div',
        { style: { display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' } },
        gallery.map(function (g, i) {
          var url = g.image ? props.getAsset(g.image).toString() : null;
          return url && h('img', { key: i, src: url, style: styles.thumb });
        })
      ),
    facts.length > 0 &&
      h(
        'div',
        null,
        facts.map(function (f, i) {
          return h('div', { key: i, style: styles.fieldRow }, h('span', { style: styles.fieldLabel }, f[0]), h('span', null, f[1]));
        })
      ),
    services.length > 0 && h('p', { style: Object.assign({}, styles.muted, { marginTop: '10px' }) }, 'Services: ' + services.join(', ')),
    h('div', { style: { marginTop: '18px' } }, props.widgetFor('body'))
  );
}

function ResourcePreview(props) {
  var entry = props.entry;
  var visibility = entry.getIn(['data', 'visibility']);
  var visLabels = { public: 'Public', request_required: 'Request Required', private: 'Private' };
  return h(
    'div',
    { style: styles.wrapper },
    h('div', { style: styles.badge }, (visLabels[visibility] || visibility || 'Public').toUpperCase()),
    h('h2', { style: styles.h2 }, entry.getIn(['data', 'title'])),
    h('p', { style: Object.assign({}, styles.muted, { marginBottom: '10px' }) }, entry.getIn(['data', 'resourceType'])),
    h('p', { style: styles.body }, entry.getIn(['data', 'description'])),
    entry.getIn(['data', 'externalUrl']) && h('p', { style: { marginTop: '10px', fontSize: '13px' } }, 'Links to: ' + entry.getIn(['data', 'externalUrl']))
  );
}

// ---------- Site Settings ----------
function BrandThemePreview(props) {
  var entry = props.entry;
  var brand = entry.getIn(['data', 'brand']);
  var theme = entry.getIn(['data', 'theme']);
  var logoUrl = brand && brand.get('logo') ? props.getAsset(brand.get('logo')).toString() : null;
  var swatches = [
    ['Primary', theme && theme.get('primary')],
    ['Dark', theme && theme.get('primaryDark')],
    ['Accent', theme && theme.get('accent')],
    ['Paper', theme && theme.get('paper')],
    ['Cream', theme && theme.get('cream')],
    ['Heading', theme && theme.get('headingText')],
    ['Body', theme && theme.get('bodyText')],
    ['Line', theme && theme.get('line')],
  ].filter(function (s) { return s[1]; });

  return h(
    'div',
    { style: styles.wrapper },
    logoUrl && h('img', { src: logoUrl, style: { height: '48px', marginBottom: '20px' } }),
    h('h3', { style: styles.h3 }, 'Colors'),
    h(
      'div',
      { style: { display: 'flex', flexWrap: 'wrap', gap: '14px', marginBottom: '20px' } },
      swatches.map(function (s, i) {
        return h(
          'div',
          { key: i, style: styles.swatch },
          h('div', { style: Object.assign({}, styles.swatchBox, { background: s[1] }) }),
          s[0]
        );
      })
    ),
    theme &&
      h(
        'p',
        { style: styles.muted },
        'Fonts: ' + [theme.get('displayFont'), theme.get('bodyFont'), theme.get('utilityFont')].filter(Boolean).join(' / ')
      )
  );
}

function FooterPreview(props) {
  var entry = props.entry;
  var contact = entry.getIn(['data', 'contact']);
  var social = entry.getIn(['data', 'social']);
  return h(
    'div',
    { style: styles.wrapper },
    h('p', { style: styles.body }, entry.getIn(['data', 'tagline'])),
    contact &&
      h(
        'div',
        { style: { marginTop: '14px', fontSize: '14px', lineHeight: 1.7 } },
        h('div', null, contact.get('addressLine1')),
        h('div', null, contact.get('addressLine2')),
        h('div', null, contact.get('phone')),
        h('div', null, contact.get('email'))
      ),
    social &&
      h(
        'p',
        { style: Object.assign({}, styles.muted, { marginTop: '10px' }) },
        'LinkedIn: ' + (social.get('linkedin') || '(not set)') + ' \u00b7 Instagram: ' + (social.get('instagram') || '(not set)')
      )
  );
}


// ---------- Register everything ----------

// Phase 1 (folder collections, registered by collection name)
CMS.registerPreviewTemplate('positions', PositionPreview);
CMS.registerPreviewTemplate('team', TeamPreview);
CMS.registerPreviewTemplate('testimonials', TestimonialPreview);

// Content collections
CMS.registerPreviewTemplate('services', ServicePreview);
CMS.registerPreviewTemplate('markets', MarketPreview);
CMS.registerPreviewTemplate('projects', ProjectPreview);
CMS.registerPreviewTemplate('resources', ResourcePreview);

// Pages collection (files-type - registered by each FILE's own name, not
// the parent collection name "pages", per Decap's documented behavior for
// file collections)
CMS.registerPreviewTemplate('home', HomePreview);
CMS.registerPreviewTemplate('services_page', HeroOnlyPagePreview);
CMS.registerPreviewTemplate('markets_page', HeroOnlyPagePreview);
CMS.registerPreviewTemplate('projects_page', HeroOnlyPagePreview);
CMS.registerPreviewTemplate('resources_page', HeroOnlyPagePreview);
CMS.registerPreviewTemplate('careers_page', HeroOnlyPagePreview);
CMS.registerPreviewTemplate('contact_page', HeroOnlyPagePreview);
CMS.registerPreviewTemplate('about_page', HeroWithSectionsPagePreview);
CMS.registerPreviewTemplate('safety_page', HeroWithSectionsPagePreview);

// Site Settings (files-type, same per-file rule)
CMS.registerPreviewTemplate('brand_theme', BrandThemePreview);
CMS.registerPreviewTemplate('footer', FooterPreview);
