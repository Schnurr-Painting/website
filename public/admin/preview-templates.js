/*
 * Custom Decap CMS preview templates.
 *
 * Loaded via plain <script> tag (no build step) - uses React/ReactDOM from
 * CDN and plain React.createElement calls instead of JSX, matching the
 * rest of this admin setup which has intentionally stayed build-free.
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

var h = React.createElement;

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
};

function toArray(val) {
  if (!val) return [];
  if (typeof val.toJS === 'function') return val.toJS();
  if (Array.isArray(val)) return val;
  return [];
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

CMS.registerPreviewTemplate('positions', PositionPreview);
CMS.registerPreviewTemplate('team', TeamPreview);
CMS.registerPreviewTemplate('testimonials', TestimonialPreview);
