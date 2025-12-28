// Render all products with descriptions
(function () {
    const descriptions = {
        1: '55-inch 4K UHD LED panel with vivid colors and slim bezels, ideal for showrooms and signage.',
        2: 'Over-ear wireless headphones with long battery life and balanced sound for daily commutes.',
        3: 'Ergonomic gaming mouse with precise sensor and customizable DPI for fast response.',
        4: 'Rugged 4K action camera with wide-angle lens, built for outdoor adventures and vlogging.',
        5: 'AMOLED smartwatch with health tracking, notifications, and multi-day battery life.',
        6: 'Portable Bluetooth speaker with punchy bass and splash resistance for on-the-go music.',
        7: 'Laptop-ready backpack with padded compartments and durable fabric for work travel.',
        8: 'USB-C hub adding HDMI, USB-A, and power pass-through for modern laptops and tablets.',
        9: 'In-ear earbuds with active noise reduction and snug fit for focused listening.',
        10:'1TB portable SSD with fast transfers and shock-resistant shell for reliable storage.',
        11:'Soft cotton tees in bulk, pre-shrunk fabric suited for retail or team uniforms.',
        12:'Insulated winter jacket with weather-resistant outer shell and warm lining.',
        13:'Lightweight running shoes with breathable mesh and cushioned midsole for training.',
        14:'Classic denim jeans with a straight fit and durable stitching for daily wear.',
        15:'Formal shirts in crisp cotton blend with a tailored silhouette for office wear.',
        16:'Cozy fleece hoodie with kangaroo pocket, great for casual and promotional use.',
        17:'Multi-pack crew socks with reinforced heel and toe for comfortable everyday wear.',
        18:'Adjustable baseball cap with curved brim and breathable panels.',
        19:'Quick-dry sport shorts with elastic waistband and pockets for workouts.',
        20:'Lightweight rain jacket with water-repellent finish and packable design.',
        21:'Tri-ply stainless pan set for even heating, suitable for induction cooktops.',
        22:'Chef-grade knife set with ergonomic handles and balanced blades.',
        23:'Durable wood cutting board set, gentle on knives and easy to clean.',
        24:'Large-capacity air fryer for oil-light frying with crisp results.',
        25:'1.8L electric kettle with auto shutoff and rapid boil.',
        26:'Aluminum pressure cooker with safety valves for fast meal prep.',
        27:'Burr coffee grinder with adjustable settings for consistent grounds.',
        28:'Stainless mixing bowls with non-slip bases for prep and serving.',
        29:'Heat-safe silicone spatula set, flexible and easy to clean.',
        30:'High-speed blender with strong motor for smoothies and sauces.',
        31:'LED desk lamp with adjustable arm and warm-neutral light modes.',
        32:'Linen curtain set with blackout lining for light control and privacy.',
        33:'Memory foam pillow pair contouring to neck support for restful sleep.',
        34:'Textured floor rug with soft pile and anti-slip backing.',
        35:'Minimal wall clock with silent sweep movement and clear markings.',
        36:'Warm LED string lights with low power draw for décor and events.',
        37:'Stackable storage bins with lids for organized shelves.',
        38:'Breathable laundry basket with sturdy handles and ventilated sides.',
        39:'Ceramic table vase with modern silhouette for centerpieces.',
        40:'Plush cotton towel set with high absorbency and soft handfeel.',
        41:'Non-slip yoga mat with 6mm cushioning for home and studio.',
        42:'Latex-free resistance bands set covering light to heavy tension.',
        43:'Cast-iron coated dumbbell pair, 5kg each, with grippy handles.',
        44:'Tangle-free jump rope with smooth bearings for cardio routines.',
        45:'Textured foam roller for muscle recovery and mobility work.',
        46:'Padded cycling gloves with breathable mesh and secure wrist closure.',
        47:'Durable rubber football with textured grip for outdoor play.',
        48:'Composite leather basketball with deep channels for control.',
        49:'Anti-fog swim goggles with adjustable strap and UV-protected lenses.',
        50:'40L hiking backpack with ventilated back panel and multiple compartments.',
        51:'Concise playbook on business strategy with practical frameworks.',
        52:'Modern marketing handbook covering campaigns, funnels, and analytics.',
        53:'Intro to data science covering Python basics, stats, and ML intuition.',
        54:'Project management guide with templates for scope, schedule, and risk.',
        55:'Accessible AI overview with examples across industries and workflows.',
        56:'Startup handbook on ideation, validation, and early growth tactics.',
        57:'Financial modeling primer with step-by-step model structures.',
        58:'UX design basics from research to wireframes and usability testing.',
        59:'Leadership essentials on communication, coaching, and decision-making.',
        60:'Mindfulness audio pack with guided sessions for focus and calm.'
    };

    const highlights = {
        1: ['4K UHD panel with HDR-ready colors', 'Ultra-slim bezels for immersive viewing', '3 HDMI + 2 USB for flexible input'],
        2: ['40-hour battery with quick charge', 'Balanced tuning with plush ear cushions', 'Foldable design for easy carry'],
        3: ['Adjustable DPI for precise control', 'Ergonomic grip for long sessions', 'Tactile switches with fast response'],
        4: ['Wide-angle lens with 4K capture', 'Rugged build for outdoor use', 'Includes mounting accessories'],
        5: ['AMOLED display with AOD', 'Heart rate and SpO2 tracking', 'Multi-day battery with fast charge'],
        6: ['Punchy bass in compact body', 'Splash resistant for outdoors', '12-hour playtime on a single charge'],
        7: ['Padded laptop compartment', 'Water-resistant fabric', 'Hidden pocket for valuables'],
        8: ['HDMI, USB-A, and PD passthrough', 'Aluminum shell for cooling', 'Plug-and-play with laptops'],
        9: ['Active noise reduction', 'Secure in-ear fit for workouts', 'Low-latency mode for media'],
        10:['1000MB/s read speeds', 'Shock-resistant enclosure', 'USB-C with backward compatibility'],
        11:['Pre-shrunk cotton fabric', 'Retail-ready bulk pack', 'Range of sizes for teams'],
        12:['Insulated for cold weather', 'Wind and water resistant', 'Adjustable hood and cuffs'],
        13:['Breathable mesh upper', 'Cushioned midsole support', 'Durable outsole for grip'],
        14:['Classic straight fit', 'Reinforced stitching', 'Soft yet durable denim'],
        15:['Easy-iron cotton blend', 'Tailored silhouette', 'Button-down collar options'],
        16:['Soft fleece interior', 'Ribbed cuffs and hem', 'Ideal for promo branding'],
        17:['Reinforced heel and toe', 'Breathable knit', 'Bulk pack value'],
        18:['Adjustable strap fit', 'Breathable panels', 'Curved brim for sun shade'],
        19:['Quick-dry fabric', 'Elastic waistband', 'Side pockets'],
        20:['Water-repellent finish', 'Packs into its own pocket', 'Adjustable hood'],
        21:['Tri-ply base for even heat', 'Induction compatible', 'Dishwasher safe'],
        22:['Full-tang blades', 'Ergonomic handles', 'Magnetic block compatible'],
        23:['Juice groove edges', 'Knife-friendly surface', 'Easy to hand wash'],
        24:['Rapid air tech for crisping', 'Digital presets', 'Removable non-stick basket'],
        25:['1.8L capacity', 'Auto shutoff safety', 'Concealed heating element'],
        26:['Multiple safety valves', 'Induction ready base', 'Durable build for daily use'],
        27:['Consistent burr grind', 'Multiple grind settings', 'Removable hopper for cleaning'],
        28:['Non-slip bases', 'Nestable storage', 'Food-safe stainless steel'],
        29:['Heat resistant silicone', 'Flexible heads for scraping', 'Dishwasher safe'],
        30:['High-torque motor', 'Pulse and variable speeds', 'Thick glass jar'],
        31:['Adjustable brightness', 'Swing arm design', 'Warm/neutral light modes'],
        32:['Blackout lining', 'Linen texture', 'Easy-install grommets'],
        33:['Pressure-relieving foam', 'Removable cover', 'Breathable design'],
        34:['Soft pile texture', 'Anti-slip backing', 'Fade resistant dyes'],
        35:['Silent sweep movement', 'Clear readable face', 'Modern minimal design'],
        36:['Warm LED glow', 'Low power draw', 'Indoor/outdoor friendly'],
        37:['Stackable with lids', 'Label-friendly surfaces', 'Sturdy molded handles'],
        38:['Ventilated sides', 'Ergonomic handles', 'Lightweight yet sturdy'],
        39:['Modern silhouette', 'Glazed ceramic finish', 'Perfect for stems or décor'],
        40:['600 GSM cotton', 'High absorbency', 'Soft handfeel'],
        41:['6mm cushioning', 'Non-slip base', 'Sweat-resistant surface'],
        42:['Light to heavy tensions', 'Latex-free material', 'Compact carry bag'],
        43:['Textured grip coating', 'Balanced 5kg weight', 'Durable build'],
        44:['Tangle-free cable', 'Smooth bearing handles', 'Adjustable length'],
        45:['Firm density foam', 'Textured surface', 'Core and recovery ready'],
        46:['Gel padding for comfort', 'Breathable mesh back', 'Hook-and-loop closure'],
        47:['Durable rubber shell', 'Textured grip', 'Outdoor play ready'],
        48:['Composite leather feel', 'Deep channels for control', 'Indoor/outdoor use'],
        49:['Anti-fog lenses', 'UV protection', 'Adjustable strap'],
        50:['40L capacity', 'Ventilated back panel', 'Multiple gear loops'],
        51:['Frameworks with examples', 'Case-style breakdowns', 'Actionable checklists'],
        52:['Campaign planning guidance', 'Funnel metrics explained', 'Templates for briefs'],
        53:['Python + stats primer', 'ML intuition without heavy math', 'Hands-on mini projects'],
        54:['Scope, schedule, risk templates', 'Clear RACI examples', 'Change control guidance'],
        55:['Industry use-cases', 'Plain-language AI concepts', 'Starter project ideas'],
        56:['Idea validation steps', 'MVP launch guidance', 'Early growth tactics'],
        57:['Model structures step-by-step', 'Scenario building tips', 'Spreadsheet ready'],
        58:['Research-to-wireframe flow', 'Usability test basics', 'Practical checklists'],
        59:['Communication and coaching tips', 'Decision-making frameworks', 'Team rituals'],
        60:['Short guided sessions', 'Focus and calm themes', 'High-quality audio production']
    };

    document.addEventListener('DOMContentLoaded', () => {
        if (!window.sampleProducts || !Array.isArray(window.sampleProducts)) return;
        const grid = document.getElementById('productsDetailGrid');
        if (!grid) return;

        const params = new URLSearchParams(window.location.search);
        const idParam = Number(params.get('id'));
        const products = Number.isFinite(idParam)
            ? window.sampleProducts.filter((p) => p.id === idParam)
            : window.sampleProducts;

        setHeading(products, idParam);

        if (!products.length) {
            grid.innerHTML = '<p class="muted">Product not found. <a href="product-details.html">View all products</a>.</p>';
            return;
        }

        const fragments = document.createDocumentFragment();
        products.forEach((product) => {
            const card = document.createElement('div');
            card.className = 'product-detail-card';
            const desc = descriptions[product.id] || 'Detailed description coming soon.';
            const bullets = highlights[product.id] || ['Quality checked', 'Ready to ship', 'Bulk-friendly pricing'];
            const image = product.imageUrl ? `<img src="${product.imageUrl}" alt="${product.name}" loading="lazy">` : '';
            card.innerHTML = `
                <div class="product-detail-image">${image}</div>
                <div class="product-detail-body">
                    <div class="product-name">${product.name}</div>
                    <div class="product-price">₹${product.price.toLocaleString('en-IN')}</div>
                    <div class="muted">Seller: ${product.seller} · Min order: ${product.minOrder}</div>
                    <p class="product-description">${desc}</p>
                    <div class="details-collapse collapsed">
                        <ul class="spec-list">${bullets.map((b) => `<li>${b}</li>`).join('')}</ul>
                    </div>
                    <button class="details-toggle" type="button">Show more</button>
                </div>
            `;
            fragments.appendChild(card);
        });

        grid.innerHTML = '';
        grid.appendChild(fragments);
        attachToggleHandlers();

        renderRelated(products, idParam);
    });

    function setHeading(products, idParam) {
        const titleEl = document.getElementById('productDetailsHeading');
        const subEl = document.getElementById('productDetailsSubhead');
        if (!titleEl || !subEl) return;

        if (Number.isFinite(idParam) && products.length === 1) {
            titleEl.textContent = products[0].name;
            subEl.textContent = 'Full description and key details for this product.';
        } else {
            titleEl.textContent = 'Product Descriptions';
            subEl.textContent = 'Browse every item with key details at a glance.';
        }
    }

    function attachToggleHandlers() {
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.details-toggle');
            if (!btn) return;
            const card = btn.closest('.product-detail-card');
            const collapse = card ? card.querySelector('.details-collapse') : null;
            if (!collapse) return;
            const isCollapsed = collapse.classList.toggle('collapsed');
            btn.textContent = isCollapsed ? 'Show more' : 'Show less';
        });
    }

    function renderRelated(products, idParam) {
        const relatedWrap = document.getElementById('relatedSection');
        const relatedGrid = document.getElementById('relatedGrid');
        if (!relatedWrap || !relatedGrid) return;

        if (!Number.isFinite(idParam) || products.length !== 1) {
            relatedWrap.style.display = 'none';
            return;
        }

        const current = products[0];
        const related = window.sampleProducts
            .filter((p) => p.category === current.category && p.id !== current.id)
            .slice(0, 4);

        if (!related.length) {
            relatedWrap.style.display = 'none';
            return;
        }

        relatedWrap.style.display = 'block';
        relatedGrid.innerHTML = '';
        const frag = document.createDocumentFragment();
        related.forEach((p) => {
            const card = document.createElement('div');
            card.className = 'product-detail-card';
            const desc = descriptions[p.id] || 'Detailed description coming soon.';
            const image = p.imageUrl ? `<img src="${p.imageUrl}" alt="${p.name}" loading="lazy">` : '';
            card.innerHTML = `
                <div class="product-detail-image">${image}</div>
                <div class="product-detail-body">
                    <div class="product-name"><a class="product-title-link" href="product-details.html?id=${p.id}">${p.name}</a></div>
                    <div class="product-price">₹${p.price.toLocaleString('en-IN')}</div>
                    <div class="muted">Seller: ${p.seller} · Min order: ${p.minOrder}</div>
                    <p class="product-description">${desc}</p>
                </div>
            `;
            frag.appendChild(card);
        });
        relatedGrid.appendChild(frag);
    }
})();
