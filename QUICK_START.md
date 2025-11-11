# 🚀 Quick Start Guide - Decap CMS

## For Content Editors (Non-Technical)

### Accessing the CMS

1. **Start the website** (ask your developer to run `pnpm dev`)
2. **Open your browser** and go to: `http://localhost:3000/admin`
3. **You'll see the Decap CMS interface**

### Editing Content

#### To Edit Hero Section (Homepage banner):
1. Click **"Halaman"** in the left sidebar
2. Click **"Hero Section"**
3. Edit any field:
   - Badge Text
   - Heading
   - Highlight Text
   - Description
   - Button texts and links
4. Click **"Save"** (top right)

#### To Edit About Page:
1. Click **"Halaman"** → **"Tentang Saya"**
2. Edit profile information:
   - Your name, title, bio
   - Purpose list items
   - Experience list items
   - Mission text
   - Location details
3. Click **"Save"**

#### To Edit Hobbies:
1. Click **"Halaman"** → **"Hobi Saya"**
2. Edit existing hobbies or add new ones:
   - Click "Add Hobbies" to add new hobby
   - Click on existing hobby to edit
   - Change title, description, icon, color
3. Click **"Save"**

#### To Edit Useful Links (Sidebar Widget):
1. Click **"Halaman"** → **"Widget Settings"**
2. Scroll to "Useful Links"
3. Click "Add Useful Links" to add new link
4. Edit name and URL
5. Click **"Save"**

#### To Edit/Create Articles:
1. Click **"Artikel"** in the left sidebar
2. To create new article: Click **"New Artikel"**
3. To edit existing: Click on the article title
4. Fill in:
   - Title (Judul)
   - Date (Tanggal Publikasi)
   - Author (Penulis) - defaults to "Shalsha Billa"
   - Image (Gambar Utama) - optional
   - Summary (Ringkasan)
   - Content (Konten) - use Markdown formatting
   - Tags - add relevant keywords
5. Click **"Save"**

### Tips

- ✅ **Auto-save**: Your work is saved when you click "Save"
- ✅ **Preview**: Some CMS versions allow preview before save
- ✅ **Rich Text**: The content editor supports:
  - **Bold**, *italic*, ~~strikethrough~~
  - Lists (bullets and numbers)
  - Links
  - Images
  - Headings
- ⚠️ **Be Careful**: Changes are saved directly to files

---

## For Developers

### Installation Already Complete ✅
All setup has been done. Content is now managed via Decap CMS.

### File Structure
```
content/
├── articles/          # Blog articles (Markdown)
│   └── *.md
└── data/             # Page content (JSON)
    ├── hero.json     # Hero section
    ├── about.json    # About page
    ├── hobbies.json  # Hobbies page
    └── widgets.json  # Widget settings

lib/
└── content.ts        # Helper functions

public/admin/
├── index.html        # CMS entry
└── config.yml        # CMS configuration
```

### Development Workflow

```bash
# Start dev server with CMS
pnpm dev

# Access CMS at:
# http://localhost:3000/admin

# Content is auto-reloaded on save
```

### Production Setup

1. Update `public/admin/config.yml`:
```yaml
backend:
  name: github
  repo: your-username/your-repo-name  # Change this!
  branch: main
```

2. Set up GitHub OAuth:
   - Go to GitHub Settings → Developer settings → OAuth Apps
   - Create new OAuth App
   - Add credentials to your hosting platform

3. Remove local backend:
```yaml
# Comment out or remove this line:
# local_backend: true
```

### Helper Functions

```typescript
import { 
  getHeroData,      // Hero section data
  getAboutData,     // About page data
  getHobbiesData,   // Hobbies page data
  getWidgetsData    // Widget settings
} from '@/lib/content';

// Usage in any component:
const hero = getHeroData();
console.log(hero.badgeText);
```

### Adding New Content Types

1. **Create JSON file** in `content/data/`:
```json
// content/data/footer.json
{
  "copyright": "© 2025 Shalsha Billa",
  "links": [...]
}
```

2. **Add to CMS config** (`public/admin/config.yml`):
```yaml
- name: "footer"
  label: "Footer"
  file: "content/data/footer.json"
  fields:
    - { label: "Copyright", name: "copyright", widget: "string" }
```

3. **Create helper function** in `lib/content.ts`:
```typescript
export function getFooterData() {
  return getContentData('footer.json');
}
```

4. **Use in component**:
```tsx
import { getFooterData } from '@/lib/content';

export default function Footer() {
  const data = getFooterData();
  return <footer>{data.copyright}</footer>;
}
```

### Troubleshooting

**CMS not loading?**
- Check if dev server is running
- Clear browser cache
- Check browser console for errors

**Changes not reflecting?**
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Restart dev server
- Check JSON file was actually updated

**Build errors?**
- Ensure all JSON files are valid
- Check TypeScript types match data structure
- Run `pnpm run build` to verify

### Testing

```bash
# Type check
pnpm run type-check

# Build test
pnpm run build

# Lint
pnpm run lint
```

---

## Common Tasks

### Change Homepage Hero Text
1. Go to `/admin`
2. Halaman → Hero Section
3. Edit "Heading" or "Description"
4. Save

### Add New Hobby
1. Go to `/admin`
2. Halaman → Hobi Saya
3. Scroll to Hobbies section
4. Click "Add Hobbies"
5. Fill in details
6. Save

### Update Location/Map
1. Go to `/admin`
2. Halaman → Widget Settings
3. Edit Location Widget fields
4. Update Map URLs
5. Save

### Create New Article
1. Go to `/admin`
2. Artikel → New Artikel
3. Fill in all fields
4. Write content in Markdown
5. Save

---

## Documentation

- 📖 **Full Migration Guide**: `CONTENT_MIGRATION.md`
- 📊 **Before/After Examples**: `BEFORE_AFTER_EXAMPLES.md`
- ✅ **Migration Summary**: `MIGRATION_SUMMARY.md`
- 🚀 **This Guide**: `QUICK_START.md`

## Support

For issues or questions:
1. Check documentation files above
2. Review Decap CMS docs: https://decapcms.org/docs/
3. Check GitHub issues for Sveltia CMS

---

**You're all set!** 🎉 Content management is now easy and code-free!
