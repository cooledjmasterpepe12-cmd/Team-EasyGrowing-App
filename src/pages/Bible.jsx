import React, { useState, useMemo } from 'react';
import { useI18n } from '../core/i18n';


const ARTICLES = [
  { id: 1, title: 'VPD (Vapor Pressure Deficit)', category: 'Environment', preview: 'Master vapor pressure deficit for optimal plant growth conditions.', content: 'VPD is the difference between the amount of moisture in the air and the maximum amount the air can hold. Optimal VPD ranges from 0.8 to 1.2 kPa during vegetative stage and 1.2 to 1.6 kPa during flowering. Higher VPD increases transpiration, promoting nutrient uptake and stronger stems. Lower VPD can lead to fungal issues and weak growth.' },
  { id: 2, title: 'PAR & PPFD Explained', category: 'Environment', preview: 'Understand photosynthetically active radiation for light optimization.', content: 'PAR (Photosynthetically Active Radiation) is the spectrum of light used by plants (400-700nm). PPFD (Photosynthetic Photon Flux Density) measures the number of photons hitting your canopy per second (μmol/m²/s). Target 800-1200 μmol/m²/s for flowering plants. Proper PPFD ensures robust growth and maximum yields.' },
  { id: 3, title: 'DLI (Daily Light Integral)', category: 'Environment', preview: 'Calculate daily light exposure for maximum photosynthesis.', content: 'DLI is the total photosynthetically active photons delivered to a plant in 24 hours. Most plants need 20-40 mol/m²/day depending on growth stage. Use DLI = PPFD × seconds in photoperiod ÷ 3600. Consistent DLI is crucial for stable yields.' },
  { id: 4, title: 'pH Management Fundamentals', category: 'Nutrition', preview: 'Soil and hydro pH ranges for nutrient availability.', content: 'Soil pH should be 6.0-7.0, hydro pH 5.5-6.5. pH affects nutrient availability and uptake. Outside optimal ranges, nutrient lockout occurs. Use pH buffers and test regularly. Buffer capacity (alkalinity) prevents sudden pH swings.' },
  { id: 5, title: 'Low Stress Training (LST)', category: 'Technique', preview: 'Bend plants gently to maximize light exposure and canopy development.', content: 'LST involves bending stems and branches to expose lower bud sites to light without removing plant material. Use soft ties or stakes. Start early in vegetative stage. Benefits include even canopy height, more bud sites, and increased yields without stress-related hermaphroditism.' },
  { id: 6, title: 'High Stress Training (HST)', category: 'Technique', preview: 'Aggressive techniques for experienced growers.', content: 'HST includes topping, super cropping, and mainlining. Causes temporary stress and reduced growth for 3-7 days. More risky than LST but can produce bushier plants and more bud sites. Only apply to healthy plants in vegetative stage. Avoid on light-sensitive cultivars.' },
  { id: 7, title: 'Mainlining Technique', category: 'Technique', preview: 'Create multiple main stems for organized growth architecture.', content: 'Mainline by creating a manifold structure: top the plant to create 2 stems, then train each node to create 4, 8, 16 equal colas. Results in perfectly balanced canopy and synchronized maturity. Requires precision and timing but yields uniform, high-quality buds.' },
  { id: 8, title: 'Supercropping Mastery', category: 'Technique', preview: 'Bend and crush stems to redirect growth energy.', content: 'Gently squeeze and bend stems without breaking them. Creates thickening at bend point and redirects auxins to lower growth points. Apply between flowering week 2-4 for best results. More advanced than LST but highly effective for restructuring canopy on the fly.' },
  { id: 9, title: 'Defoliation Strategies', category: 'Technique', preview: 'Strategic leaf removal for light penetration and air flow.', content: 'Heavy defoliation early vegetative stage promotes branching. Light defoliation in early flowering (weeks 1-3) improves light penetration. Never remove more than 20% of leaves at once. Target large fan leaves blocking bud sites. Monitor plant response and adjust.' },
  { id: 10, title: 'Topping & FIM Techniques', category: 'Technique', preview: 'Classic methods to double or quadruple shoot development.', content: 'Topping: remove the meristem entirely, creating 2 equal shoots. FIM (F*ck I Missed): cut 75% of meristem, potentially creating 4 shoots. Both cause 7-10 day growth delay. Use before mid-vegetative stage. Avoid on autos and sensitive strains.' },
  { id: 11, title: 'Screen of Green (ScrOG)', category: 'Technique', preview: 'Use netting to train uniform canopy height.', content: 'Install a screen 30-40cm above soil. Weave branches through mesh as they grow, maintaining flat canopy. All bud sites receive equal light, resulting in even maturity and maximum yields in limited space. Works best with 1-2 plants in small tents.' },
  { id: 12, title: 'Sea of Green (SOG)', category: 'Technique', preview: 'High-density planting for rapid harvests.', content: 'SOG uses many small plants in minimal vegetative time (2-3 weeks). Packed densely to create a continuous "sea" of uniform canopy. Minimizes vegetative time, maximizes flower time. Best for clones and feminized seeds. Increases electricity use but shortens crop cycle.' },
  { id: 13, title: 'Hydroponic Systems 101', category: 'Technique', preview: 'Deep water culture, DWC, NFT, flood & drain explained.', content: 'DWC: roots suspended in aerated nutrient solution. NFT: nutrient film trickles over roots. Flood & Drain: periodic submersion. All are recirculating systems offering precise control and faster growth than soil. Higher upfront cost but excellent for optimization and yields.' },
  { id: 14, title: 'Aeroponic Growing', category: 'Technique', preview: 'Roots misted in air for maximum oxygen and rapid growth.', content: 'Aeroponics suspends roots in air, misting them with nutrient solution every 15 minutes. Highest oxygen availability increases growth rate 30-50%. Requires reliable equipment and electricity. Most advanced method but demanding on new growers.' },
  { id: 15, title: 'Coco Coir Growing', category: 'Technique', preview: 'Popular soilless medium with excellent properties.', content: 'Coco is inert, reusable, and retains moisture well. Requires cal-mag supplementation due to potassium saturation. pH 5.5-6.5. Flushes easily. Excellent for both hand-watering and drip systems. Sustainable alternative to peat moss.' },
  { id: 16, title: 'Living Soil Philosophy', category: 'Technique', preview: 'Organic, biological approach to growing in composted soil.', content: 'Living soil contains beneficial microbes, fungi, and arthropods that create nutrient cycling. Requires no additional nutrient inputs if properly built. Slower in early growth but plants access nutrients on-demand. Multiple crops possible before refresh needed.' },
  { id: 17, title: 'Nutrient Lockout Issues', category: 'Nutrition', preview: 'Diagnose and fix nutrient availability problems.', content: 'Lockout occurs when pH is outside optimal range, preventing nutrient uptake despite adequate nutrients present. Symptoms: yellow/purple leaves despite high EC. Solution: flush and correct pH. Prevent by maintaining proper pH range and avoiding excessive salts.' },
  { id: 18, title: 'Spider Mites Identification & Control', category: 'Pests', preview: 'Detect and eliminate spider mites before they spread.', content: 'Spider mites create fine webbing and cause yellow speckles on leaves. Rapid reproduction (4-7 days per generation). Increase humidity above 60%, spray with water daily, use neem oil. Introduce predatory mites for biological control. Scout weekly throughout grow.' },
  { id: 19, title: 'Thrips Management', category: 'Pests', preview: 'Prevent and treat thrips infestations quickly.', content: 'Thrips create silvery streaks and dark droppings on leaves. Vector for viruses. Use blue/yellow sticky traps to monitor. Spray neem oil or spinosad. Introduce predatory mites or parasitic wasps. Quarantine new plants for 2 weeks before adding to grow space.' },
  { id: 20, title: 'Fungus Gnats Control', category: 'Pests', preview: 'Eliminate gnats from soil and prevent breeding.', content: 'Gnats lay eggs in wet soil. Let top inch dry between waterings. Use sand layer on soil surface to block egg laying. Yellow sticky traps catch adults. Bacillus thuringiensis (Bti) larvicide kills larvae. Maintain 40-50% relative humidity.' },
  { id: 21, title: 'Powdery Mildew Prevention', category: 'Pests', preview: 'Stop white fungal coating from destroying your crop.', content: 'PM thrives in 60-75°F with high humidity (60%+). Increase air circulation and lower RH below 50%. Remove affected leaves. Spray sulfur powder or potassium bicarbonate weekly. Never spray during flowering with harsh chemicals. Neem oil in vegetative stage only.' },
  { id: 22, title: 'Bud Rot (Botrytis) Defense', category: 'Pests', preview: 'Prevent dense buds from rotting during flower.', content: 'Botrytis thrives in high humidity (above 60%) and stagnant air. Maintain 40-50% RH in flower. Excellent air circulation is critical. Remove dead leaves promptly. Lower canopy temperatures to 60-65°F. Never touch wet buds. At first sign, remove affected bud and spray surrounding area.' },
  { id: 23, title: 'Root Rot Prevention', category: 'Pests', preview: 'Keep roots healthy and oxygen-rich.', content: 'Root rot (pythium) kills root tissue in waterlogged, warm conditions. Maintain 18-22°C water temps in hydro. Never let roots sit in stagnant water. Use air stones and pumps. Sterilize equipment between crops. Add beneficial bacteria (hydroguard) to prevent pathogens.' },
  { id: 24, title: 'Carbon Filter Selection', category: 'Environment', preview: 'Remove odors with properly sized carbon filters.', content: 'Carbon filters absorb volatile odors. Size based on grow space volume: 1 CFM per cubic foot minimum, 2-3 CFM for sealing spaces. Replace every 6-12 months depending on use. Pair with inline fans rated higher than filter capacity. Duct position matters: carbon filter should be first in airflow path.' },
  { id: 25, title: 'Light Trap Efficiency', category: 'Environment', preview: 'Prevent light leaks that trigger flowering.', content: 'Even small light leaks trigger flowering in photoperiod plants. Use 2-3 layers of light baffles or baffle boxes around intake/exhaust holes. Black fabric tape seals gaps. Check room at night for any light. Light leaks reduce yields and cause hermaphroditism.' },
  { id: 26, title: 'Cloning Success Rate', category: 'Technique', preview: 'Propagate identical plants from cuttings.', content: 'Take clones from vegetating plants only. Use sharp, clean blade. Cut 6-8 inch stems with 2-3 nodes. Dip in rooting hormone. Maintain 24-hour light, 75-80°F, 80%+ RH. Roots form in 7-14 days. Rooting hormone and cloning dome dramatically increase success rates.' },
  { id: 27, title: 'Germination Techniques', category: 'Technique', preview: 'Successfully start seeds with proper moisture and warmth.', content: 'Soak seeds 12-24 hours in distilled water. Place between wet paper towels in dark, warm place (70-80°F). Plant when taproot emerges. Direct soil method: water medium, place seed 0.5 inch deep, keep moist (not wet). Germination in 3-7 days. Higher germination rate with paper towel method.' },
  { id: 28, title: 'Terpene Profiles', category: 'Genetics', preview: 'Understand flavor and effect compounds.', content: 'Terpenes are volatile oils responsible for flavor and aroma. Common: myrcene (earthy), limonene (citrus), pinene (pine), caryophyllene (pepper). Terpene profile affects entourage effect with cannabinoids. Temperature, humidity, and harvest timing all influence terpene retention and expression.' },
  { id: 29, title: 'Cannabinoid Content Overview', category: 'Genetics', preview: 'THC, CBD, and their effects explained.', content: 'THC: primary psychoactive compound, targets CB1 receptors. CBD: non-intoxicating, anti-inflammatory, targets CB2 receptors. CBN: sleepy effect. Ratios vary by strain genetics and harvest maturity. Higher THC % doesn\'t always mean better quality - terpene-cannabinoid interaction matters.' },
  { id: 30, title: 'Drying & Curing Best Practices', category: 'Harvest', preview: 'Optimize post-harvest handling for maximum potency and flavor.', content: 'Dry at 60-65°F, 50-60% RH for 10-14 days until stems snap. Cure in glass jars at 62% RH for 2-4 weeks, burping daily for first week. Proper cure increases potency, smoothness, and flavor. Improper drying/curing causes harsh smoke, mold risk, and lost terpenes.' },
  { id: 31, title: 'Harvesting at Peak Ripeness', category: 'Harvest', preview: 'Identify optimal harvest window using trichome observation.', content: 'Monitor trichome color: clear = not ready, milky = peak THC, amber = higher CBN. Use jeweler\'s loupe to check magnified trichomes. Harvest when 50-70% trichomes are milky for balanced effect. Individual bud trichomes mature at different rates.' },
  { id: 32, title: 'Yield Optimization Fundamentals', category: 'Technique', preview: 'Maximize dry weight through environmental and genetic control.', content: 'Factors affecting yield: light intensity (PPFD), photoperiod (14h veg, 12h flower), CO2 (1000-1500 ppm), nutrient balance, genetics, training. A/C, CO2 enrichment, and T5 supplements during stretch phase dramatically increase yields. Genetic potential caps maximum, environment determines if you reach it.' },
];

const MYTHS = [
  {
    title: 'myth.flushing',
    desc: 'myth.flushing.desc',
    truth: 'myth.flushing.truth',
  },
  {
    title: 'myth.purple',
    desc: 'myth.purple.desc',
    truth: 'myth.purple.truth',
  },
  {
    title: 'myth.light',
    desc: 'myth.light.desc',
    truth: 'myth.light.truth',
  },
  {
    title: 'myth.pots',
    desc: 'myth.pots.desc',
    truth: 'myth.pots.truth',
  },
];

const CATEGORIES = ['All', 'Environment', 'Technique', 'Pests', 'Nutrition', 'Genetics', 'Harvest'];

export default function Bible() {
  const { t } = useI18n();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState(null);

  const filteredArticles = useMemo(() => {
    return ARTICLES.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(search.toLowerCase()) ||
        article.preview.toLowerCase().includes(search.toLowerCase()) ||
        article.content.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === 'All' || article.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  return (
    <div className="pixel-container">
      <h1 className="pixel-h1">{t('bible.title')}</h1>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          className="pixel-input"
          placeholder={t('bible.search')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: '100%', marginBottom: '12px' }}
        />
      </div>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
        {CATEGORIES.map((category) => (
          <button
            key={category}
            className={activeCategory === category ? 'pixel-tag-cyan' : 'pixel-tag'}
            onClick={() => setActiveCategory(category)}
            style={{ cursor: 'pointer' }}
          >
            {category}
          </button>
        ))}
      </div>

      <h2 className="pixel-h2">{t('bible.mythbuster')}</h2>
      <div style={{ marginBottom: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '12px' }}>
        {MYTHS.map((myth, idx) => (
          <div key={idx} className="pixel-card" style={{ borderColor: '#00e5ff', borderWidth: '4px' }}>
            <h3 className="pixel-h3">{t(`bible.${myth.title}`)}</h3>
            <p style={{ color: '#00ff00', marginBottom: '8px' }}>{t(`bible.${myth.desc}`)}</p>
            <p style={{ color: '#00e5ff', fontSize: '12px' }}>
              <strong>{t('bible.truth')}:</strong> {t(`bible.${myth.truth}`)}
            </p>
          </div>
        ))}
      </div>

      <h2 className="pixel-h2">{t('bible.articles')}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            className="pixel-card"
            onClick={() => setSelectedArticle(article)}
            style={{ cursor: 'pointer' }}
          >
            <h3 className="pixel-h3">{article.title}</h3>
            <span className="pixel-tag-amber">{article.category}</span>
            <p style={{ color: '#00ff00', marginTop: '8px', fontSize: '12px' }}>{article.preview}</p>
          </div>
        ))}
      </div>

      {selectedArticle && (
        <div className="pixel-modal" onClick={() => setSelectedArticle(null)}>
          <div className="pixel-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px', maxHeight: '80vh', overflow: 'auto' }}>
            <h2 className="pixel-h2">{selectedArticle.title}</h2>
            <span className="pixel-tag-amber">{selectedArticle.category}</span>
            <p style={{ color: '#00ff00', marginTop: '12px', lineHeight: '1.6' }}>{selectedArticle.content}</p>
            <button className="pixel-btn" onClick={() => setSelectedArticle(null)} style={{ marginTop: '16px' }}>
              {t('bible.close')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
