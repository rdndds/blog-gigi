## 1. Navigation Structure Correction
- [ ] 1.1 Revert header navigation to remove "Edukasi" and "Program 3D" items
- [ ] 1.2 Revert footer navigation to simplified structure
- [ ] 1.3 Keep existing navigation structure with updated names only
- [ ] 1.4 Remove unnecessary route redirects if created

## 2. Content Updates Using Exact opi.md Content
- [ ] 2.1 Replace existing articles with exact content from opi.md
- [ ] 2.2 Create "Lonjakan Karies Digital Age" article with exact opi.md content
- [ ] 2.3 Create "Gerakan Nasional Anti-Gula di Sekolah" article with exact opi.md content
- [ ] 2.4 Create "Inovasi Edukasi 3D & AI" article with exact opi.md content

## 3. Profile and Author Information Update
- [ ] 3.1 Update about.json with Erdinta Ovielia Putri profile from opi.md
- [ ] 3.2 Update hero.json with blog name and description from opi.md
- [ ] 3.3 Update any hardcoded references to maintain consistency

## 4. Remove Over-Engineered Pages
- [ ] 4.1 Delete app/edukasi/page.tsx directory and file
- [ ] 4.2 Delete app/program-3d/page.tsx directory and file
- [ ] 4.3 Remove unnecessary data files (edukasi.json, program-3d.json)
- [ ] 4.4 Update lib/content.ts to remove unnecessary getEdukasiData and getProgram3DData functions

## 5. Cleanup and Validation
- [ ] 5.1 Remove translate widget if not specified in opi.md
- [ ] 5.2 Update sidebar to remove unnecessary widgets
- [ ] 5.3 Test navigation works correctly after reverting
- [ ] 5.4 Validate all pages load without errors
- [ ] 5.5 Run build test to ensure no issues