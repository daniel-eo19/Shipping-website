/**
 * Downloads all source files from the Webild Gitea repo
 * into the local project directory.
 */

import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, '..');

const REPO_BASE = 'https://gitea.webild.io/bender/8f5532d7-48f0-4df7-be9d-ccc0c93ef950/raw/branch/main';

// All source files to download (from git tree)
const FILES = [
  // App
  'src/app/globals.css',
  'src/app/layout.tsx',
  'src/app/page.tsx',
  'src/app/error.tsx',
  'src/app/global-error.tsx',
  'src/app/styles/base.css',
  'src/app/styles/theme.css',
  'src/app/styles/utilities.css',
  'src/app/styles/variables.css',

  // Providers
  'src/providers/themeProvider/ThemeProvider.tsx',
  'src/providers/themeProvider/config/background.ts',
  'src/providers/themeProvider/config/baseVw.ts',
  'src/providers/themeProvider/config/borderRadius.ts',
  'src/providers/themeProvider/config/constants.ts',
  'src/providers/themeProvider/config/contentWidth.ts',
  'src/providers/themeProvider/config/shared.ts',
  'src/providers/themeProvider/config/textSizing.ts',
  'src/providers/themeProvider/config/types.ts',
  'src/providers/themeProvider/styles/cardStyles.ts',
  'src/providers/themeProvider/styles/primaryButtonStyles.ts',
  'src/providers/themeProvider/styles/secondaryButtonStyles.ts',
  'src/providers/themeProvider/utils/detectLightBackground.ts',

  // Lib
  'src/lib/utils.ts',
  'src/lib/buttonUtils.ts',
  'src/lib/gsap-setup.ts',
  'src/lib/api/blog.ts',
  'src/lib/api/product.ts',

  // Utils
  'src/utils/debounce.ts',
  'src/utils/throttle.ts',
  'src/utils/sendContactEmail.ts',
  'src/utils/visual-edit-script.ts',

  // Types
  'src/types/button.ts',
  'src/types/navigation.ts',

  // Components - shared
  'src/components/Accordion.tsx',
  'src/components/Textbox.tsx',
  'src/components/ServiceWrapper.tsx',
  'src/components/shared/AvatarGroup.tsx',
  'src/components/shared/Badge.tsx',
  'src/components/shared/Dashboard.tsx',
  'src/components/shared/FavoriteButton.tsx',
  'src/components/shared/FillWidthText/FillWidthText.tsx',
  'src/components/shared/FillWidthText/useFillWidthText.ts',
  'src/components/shared/FooterColumns.tsx',
  'src/components/shared/LogoMarquee.tsx',
  'src/components/shared/MediaBadge.tsx',
  'src/components/shared/MediaContent.tsx',
  'src/components/shared/OverlayArrowButton.tsx',
  'src/components/shared/PricingBadge.tsx',
  'src/components/shared/PricingFeatureList.tsx',
  'src/components/shared/ProductImage.tsx',
  'src/components/shared/QuantityButton.tsx',
  'src/components/shared/SocialLinks.tsx',
  'src/components/shared/SvgTextLogo/SvgTextLogo.tsx',
  'src/components/shared/SvgTextLogo/useSvgTextLogo.ts',
  'src/components/shared/Tag.tsx',
  'src/components/shared/TestimonialAuthor.tsx',

  // Components - button
  'src/components/button/Button.tsx',
  'src/components/button/types.ts',
  'src/components/button/useButtonClick.ts',
  'src/components/button/useCharAnimation.ts',
  'src/components/button/useButtonAnimation.ts',
  'src/components/button/SelectorButton.tsx',
  'src/components/button/ButtonTextUnderline.tsx',
  'src/components/button/ButtonIconArrow.tsx',
  'src/components/button/ButtonHoverBubble.tsx',
  'src/components/button/ButtonExpandHover.tsx',
  'src/components/button/ButtonTextStagger/ButtonTextStagger.tsx',
  'src/components/button/ButtonTextStagger/StaggerButton.css',
  'src/components/button/ButtonTextShift/ButtonTextShift.tsx',
  'src/components/button/ButtonTextShift/TextShiftButton.css',
  'src/components/button/ButtonShiftHover/ButtonShiftHover.tsx',
  'src/components/button/ButtonShiftHover/ShiftButton.css',
  'src/components/button/ButtonHoverMagnetic/ButtonHoverMagnetic.tsx',
  'src/components/button/ButtonHoverMagnetic/useMagneticEffect.ts',
  'src/components/button/ButtonDirectionalHover/ButtonDirectionalHover.tsx',
  'src/components/button/ButtonDirectionalHover/DirectionalButton.css',
  'src/components/button/ButtonDirectionalHover/useDirectionalHover.ts',
  'src/components/button/ButtonElasticEffect/ButtonElasticEffect.tsx',
  'src/components/button/ButtonElasticEffect/useElasticEffect.ts',
  'src/components/button/ButtonBounceEffect/ButtonBounceEffect.tsx',
  'src/components/button/ButtonBounceEffect/BounceButton.css',
  'src/components/button/ButtonSlideBackground.tsx',

  // Components - hooks
  'src/components/hooks/useButtonAnimation.ts',

  // Components - text
  'src/components/text/TextAnimation.tsx',
  'src/components/text/TextNumberCount.tsx',
  'src/components/text/types.ts',

  // Components - navbar
  'src/components/navbar/HamburgerButton.tsx',
  'src/components/navbar/Logo.tsx',
  'src/components/navbar/NavbarLayoutFloatingInline.tsx',
  'src/components/navbar/NavbarLayoutFloatingOverlay/NavbarLayoutFloatingOverlay.tsx',
  'src/components/navbar/NavbarLayoutFloatingOverlay/useMenuAnimation.ts',
  'src/components/navbar/NavbarLayoutFloatingOverlay/useResponsive.ts',
  'src/components/navbar/NavbarLayoutFloatingOverlay/useScrollDetection.ts',
  'src/components/navbar/expandingMenu/ExpandingMenu.tsx',
  'src/components/navbar/expandingMenu/useResponsiveMenuWidth.ts',
  'src/components/navbar/mobileMenu/MobileMenu.tsx',
  'src/components/navbar/mobileMenu/useMenuAnimation.ts',

  // Components - background
  'src/components/background/AnimatedAuroraBackground.tsx',
  'src/components/background/AnimatedGridBackground.tsx',
  'src/components/background/AuroraBackground.tsx',
  'src/components/background/BlurBottomBackground.tsx',
  'src/components/background/CanvasRevealBackground.tsx',
  'src/components/background/CanvasRevealEffect.tsx',
  'src/components/background/CardPattern.tsx',
  'src/components/background/CellWaveBackground.tsx',
  'src/components/background/CircleGradientBackground.tsx',
  'src/components/background/DotGridBackground.tsx',
  'src/components/background/DownwardRaysBackground.tsx',
  'src/components/background/FluidBackground.tsx',
  'src/components/background/GlowingEffect.tsx',
  'src/components/background/GlowingOrbBackground.tsx',
  'src/components/background/GlowingOrbSparklesBackground.tsx',
  'src/components/background/GradientBarsBackground.tsx',
  'src/components/background/GridBackround.tsx',
  'src/components/background/HeroBackgrounds.tsx',
  'src/components/background/NoiseBackground.tsx',
  'src/components/background/NoiseDiagonalGradientBackground.tsx',
  'src/components/background/NoiseGradientBackground.tsx',
  'src/components/background/PlainBackground.tsx',
  'src/components/background/RadialGradientBackground.tsx',
  'src/components/background/RotatedRaysBackground.tsx',
  'src/components/background/RotatingGradientBackground.tsx',
  'src/components/background/Sparkles.tsx',
  'src/components/background/SparklesGradientBackground.tsx',
  'src/components/background/floatingGradientBackground/FloatingGradientBackground.css',
  'src/components/background/floatingGradientBackground/FloatingGradientBackground.tsx',

  // Components - bento
  'src/components/bento/BentoGlobe.tsx',
  'src/components/bento/BentoMarquee.tsx',
  'src/components/bento/BentoMediaStack.tsx',
  'src/components/bento/BentoRevealIcon.tsx',
  'src/components/bento/BentoTimeline.tsx',
  'src/components/bento/BentoOrbitingIcons.tsx',
  'src/components/bento/BentoPhoneAnimation.tsx',
  'src/components/bento/BentoChatAnimation.tsx',
  'src/components/bento/BentoAnimatedBarChart.tsx',
  'src/components/bento/BentoIconInfoCards.tsx',
  'src/components/bento/BentoMap.tsx',
  'src/components/bento/Bento3DCardGrid.tsx',
  'src/components/bento/Bento3DStackCards.tsx',
  'src/components/bento/Bento3DTaskList.tsx',
  'src/components/bento/BentoLineChart/BentoLineChart.tsx',
  'src/components/bento/BentoLineChart/CustomTooltip.tsx',
  'src/components/bento/BentoLineChart/utils.ts',

  // Components - sections (all used + their deps)
  'src/components/sections/AnimationContainer.tsx',
  'src/components/sections/hero/HeroSplitDoubleCarousel.tsx',
  'src/components/sections/feature/FeatureBento.tsx',
  'src/components/sections/feature/FeatureCardTwentySix.tsx',
  'src/components/sections/feature/FeatureCardSixteen.tsx',
  'src/components/sections/testimonial/TestimonialCardFifteen.tsx',
  'src/components/sections/metrics/MetricCardOne.tsx',
  'src/components/sections/team/TeamCardFive.tsx',
  'src/components/sections/faq/FaqBase.tsx',
  'src/components/sections/contact/ContactCTA.tsx',
  'src/components/sections/footer/FooterBase.tsx',
  'src/components/sections/footer/FooterBaseReveal.tsx',

  // Card stack (used in bento)
  'src/components/cardStack/CardList.tsx',
  'src/components/cardStack/CardStack.tsx',
  'src/components/cardStack/CardStackTextBox.tsx',
  'src/components/cardStack/types.ts',
  'src/components/cardStack/hooks/useCardAnimation.ts',
  'src/components/cardStack/hooks/useDepth3DAnimation.ts',
  'src/components/cardStack/hooks/useScrollProgress.ts',
  'src/components/cardStack/layouts/grid/GridLayout.tsx',
  'src/components/cardStack/layouts/grid/gridConfigs.ts',

  // Form
  'src/components/form/Input.tsx',
  'src/components/form/Textarea.tsx',
  'src/components/form/ContactForm.tsx',
  'src/components/form/EmailSignupForm.tsx',

  // Tag
  'src/tag/Tag.tsx',
  'src/tag/useTagEffects.ts',

  // Hooks
  'src/hooks/useClickOutside.ts',

  // Legal
  'src/components/legal/LegalSection.tsx',
];

async function downloadFile(relativePath) {
  const url = `${REPO_BASE}/${relativePath}`;
  const res = await fetch(url);
  if (!res.ok) {
    console.warn(`  SKIP (${res.status}): ${relativePath}`);
    return false;
  }
  const content = await res.text();
  const dest = join(PROJECT_ROOT, relativePath);
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, content, 'utf8');
  return true;
}

async function main() {
  console.log(`Downloading ${FILES.length} files from Gitea...\n`);
  let ok = 0, fail = 0;

  // Batch downloads
  const BATCH = 5;
  for (let i = 0; i < FILES.length; i += BATCH) {
    const batch = FILES.slice(i, i + BATCH);
    const results = await Promise.all(batch.map(f => downloadFile(f).then(success => {
      if (success) { console.log(`  ✓ ${f}`); ok++; }
      else { fail++; }
      return success;
    })));
  }

  console.log(`\nDone: ${ok} downloaded, ${fail} skipped.`);
}

main().catch(console.error);
