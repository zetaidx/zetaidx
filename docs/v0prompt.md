**Zetaidx** is a decentralized crypto index platform offering tokens that represent baskets of cryptocurrencies. The application features a navigational shell and several pages (Indexes, Trade, Wrap/Unwrap, Dashboard, Info), each designed for a specific set of user interactions. Below is a detailed breakdown of the UI layout and key components for each section of the Zetaidx web app, with design considerations and best practices.

## Top-Level Layout (App Shell)

The app’s shell consists of a **sticky header** navigation bar available across all pages. This header ensures users can quickly switch sections and is fixed to the top for easy access. It includes:

- **Logo:** Positioned on the left for brand identity.
- **Main Navigation Links:** Clearly labeled links to core pages:
  - `Dashboard`
  - `Indexes`
  - `Trade`
  - `Wrap/Unwrap`
  - `Info`
- **Language Selector:** A locale dropdown on the top-right (leveraging Next.js i18n). This allows switching the interface language. (Built with a library such as Next-i18next, a popular Next.js plugin for managing translations .)

The sticky header uses a responsive layout so that on smaller screens the nav links might collapse into a menu (hamburger or dropdown), ensuring the design remains mobile-friendly. Overall, this consistent app shell provides intuitive global navigation.

## Indexes Page

.\_

The **Indexes** page is the main landing for exploring Zetaidx’s index token offerings. It gives users an overview of all available index tokens, each representing a diversified basket of crypto assets (each index token is backed by a reserve of underlying assets . Key sections of this page include:

- **Page Title & Subtitle:** At the top, a prominent title “Explore Index Tokens” with a subtitle like “Diversified exposure across crypto markets — backed by real assets.” This explains the purpose of index tokens (one token gives exposure to many assets, as the underlying reserves back its value and sets context for the user.

- **Filters & Sorting Toolbar:** A control bar that lets users refine and order the list of indexes. Users can filter by _Theme_ (e.g. Meme tokens, DeFi, Blue-Chip) and sort by metrics like Total Volume, TVL (total value locked), or recent performance. There is also a toggle to switch between a **grid view** and a **list view**, accommodating user preference for how information is displayed. These tools help users quickly find indices that fit their interest (for example, filtering to see only DeFi index products).

- **Index Token Grid:** The core of the page is a grid of **Index Cards**, each summarizing an index token. In grid view, cards provide a visual snapshot of each index:

  - **Token Icon & Name:** A logo or icon for the index, with its name (e.g. _“Meme Basket”_) and symbol (e.g. _ZIDX-MEME_) clearly labeled.
  - **Brief Description:** One sentence summary (e.g. “Top-performing meme tokens bundled in one index.”) describing the index’s theme or strategy.
  - **Composition Pie Chart:** A small pie chart (using Shadcn UI charts) illustrating the index’s asset composition (the percentage allocation of each constituent token). This gives a quick visual sense of the portfolio split.
  - **Key Metrics:** A few critical performance indicators:
    - **7D% / 30D% Performance:** Percentage change over the last 7 days and 30 days.
    - **TVL (Total Value Locked):** The current value of all assets in this index (liquidity backing the index).
    - **24H Volume:** Trading volume of the index token in the last 24 hours.
  - **CTA Button:** A call-to-action like “View / Trade” that brings the user to that index’s detailed page or trade interface.

  Each card is designed to be informative yet compact, so users can scan multiple index offerings at a glance. The use of a composition chart on the card helps convey diversification benefits visually. (The idea of bundling assets is to simplify investing; instead of buying many tokens individually, a user can hold one index token .)

In list view (if toggled), the same information might be presented in a table-like format spanning the page width, which could make it easier to compare metrics across indexes directly. Regardless of view, the combination of text and visuals on the Indexes page helps users understand and compare various index tokens quickly.

## Trade Page

The **Trade** page provides a swapping interface for users to exchange their tokens for Zetaidx index tokens (and vice versa) in a simple and familiar way. It is akin to a typical decentralized exchange (DEX) swap UI with some additional context for indexes. The layout is centered and focused for user attention, containing:

- **Swap Interface Panel:** A card or modal centered on the page with the title “Swap Tokens”. This panel contains the core swap controls.

  - **“From” Token Selector:** A dropdown menu for the token the user wants to swap _from_. This will list supported input tokens (for example, stablecoins like USDC or ETH that the user can spend).
  - **“To” Token Selector:** A dropdown for the token the user wants to swap _to_. In this context, it would list the available index tokens (the ZIDX tokens). Upon selecting an index, the interface may show its icon and symbol.
  - These selectors likely integrate with the user’s wallet to show balances for each token and may have a quick “max” button to fill in the maximum available amount .

- **Amount Input & Preview:** An input field where the user enters the amount of the “From” token they want to swap. As they type:

  - The UI shows an **estimated output** amount for the “To” token, based on current exchange rate.
  - The exchange rate (price) is displayed (e.g. 1 Index Token = X USDC).
  - **Slippage Warning:** If the price impact or slippage of the trade is above a certain threshold (for example, if liquidity is low causing >1% slippage), the UI can display a warning or highlight. This alerts the user that the execution price may differ significantly from the current rate. (High slippage is a sign of low liquidity or large trade size, which may result in worse rates .) Users might be able to adjust their slippage tolerance in advanced settings.

- **Price Chart Panel:** Next to or below the swap inputs, a small chart is provided showing the price trend of the selected index token (with a toggle for 24h or 7d view). This gives context about the asset’s recent performance as the user trades. For example, before swapping into an index, the user can see if its price has been rising or falling over the past week. (Providing such a chart within the swap interface adds transparency and helps users make informed decisions without leaving the page.)

- **Liquidity Alert:** If the particular index token’s liquidity pool is low (which could lead to high slippage or volatility in price), an alert message like “⚠️ Low pool liquidity may impact pricing.” is shown. This prepares users for potential slippage or failure in trade execution due to insufficient liquidity.

- **Swap Button:** A prominent button to execute the swap. This button has multiple states for a smooth UX:
  - **Idle State:** Default state when the form is ready (e.g. “Swap”).
  - **Loading State:** When the transaction is being submitted (e.g. a spinner indicating the swap is in progress).
  - **Success State:** After a successful swap (could show a checkmark or a “Success” message).
  - **Error State:** If something goes wrong (for example, insufficient balance, slippage too high, or transaction rejected), an error message or toast notification is shown. The design should promptly inform the user and possibly suggest remediation (like adjusting slippage or trying a smaller amount).

.\_

Additionally, advanced details (often hidden under a toggle or shown on a confirmation step) can include information such as minimum amount to be received (after slippage), price impact, and fees. As a best practice, if slippage tolerance is displayed, allowing the user to edit it on the fly (as shown above) is considered a helpful “accelerator” for power users . The Trade page in Zetaidx follows familiar patterns from popular DEXs so users feel comfortable, but with added context (charts, warnings) tailored for trading index tokens.

## Wrap/Unwrap Page

The **Wrap/Unwrap** page is where users can create (mint) new index tokens by depositing the underlying assets (_wrapping_), or break an index token back into its constituents (_unwrapping_). This page uses a tabbed interface to separate the two related actions:

- **Tabs:** At the top of this page, two tabs allow the user to switch between **Wrap** and **Unwrap**. The interface under each tab changes accordingly. Smooth transitions (with a subtle animation when switching) make it clear that the user is toggling between two modes of a related feature.

### Wrap Tab

Under the **Wrap** tab, the UI presents a form that lets the user input multiple ERC-20 tokens which correspond to the components of a selected index. The goal is to deposit the correct proportions of each asset to mint the index token. Key elements include:

- **Index Selection (optional):** If multiple index products exist, the user might first choose which index they want to mint. This selection could auto-fill the required token types and their target ratios.

- **Multi-Token Input Form:** A series of input rows, one for each required token in the index’s basket. For example, if _ZIDX-MEME_ index consists of 50% DOGE and 50% SHIB, the form will have two rows:

  - Each row has a **Token Selector** (pre-selected or fixed to the required token, e.g. DOGE) and an **Amount field** where the user enters how much of that token to supply.
  - If the index has many components, all are listed with their respective selectors and inputs. There may be an option to “Add all” or fill with proportional amounts.

- **Required Proportions Guidance:** The UI should guide the user on the required ratio of inputs. This could be done by placeholder text or sub-labels on each row indicating something like “requires 50% of total basket” or “proportion: 1:1” etc. As the user fills one of the amounts, the form might calculate and suggest the amounts needed for the other tokens to meet the index allocation. For instance, if the user enters 100 USDC for a basket that is 50% USDC and 50% WBTC, the form could indicate that they need approximately $100 worth of WBTC as well.

- **Output Estimate:** As the user enters the token amounts to wrap, the interface shows how many **Zetaidx index tokens** will be minted as a result. For example, “You will receive 1.2 ZIDX-MEME tokens” based on the current index token price or the net asset value of the basket. This helps set expectations before submission.

- **Wrap Button:** A button to execute the wrap (mint) transaction, which will likely call a smart contract to bundle the assets. As with swaps, it will have loading and success states, and possibly a transaction progress indicator since wrapping might involve multiple token transfers. Upon success, the user’s wallet will have the new index tokens.

- **Transaction Feedback:** Given wrapping might involve multiple assets being transferred from the user, the UI should provide clear feedback: e.g. a pending status (“Wrapping in progress…”) and a confirmation (“Success! You have minted X ZIDX tokens.”). If the transaction fails (e.g. user doesn’t approve one of the tokens or sends insufficient amount), a clear error is shown.

Notably, by allowing users to wrap, Zetaidx ensures the index tokens are **mintable** by anyone providing the underlying assets in the right proportions (similar to how index fund tokens can be created by depositing constituents) . This aligns with decentralized principles: the index token represents real assets that the user has contributed, and in return they receive the single index token.

### Unwrap Tab

The **Unwrap** tab is effectively the reverse process. The user can redeem an index token to get back the underlying assets.

- **Index Token Input:** The user specifies how many Zetaidx index tokens they want to unwrap (e.g. “Enter amount of ZIDX-MEME to unwrap”). They might use a slider or a max button to select up to the full balance they hold.

- **Output Breakdown:** Once the amount is entered, the UI calculates and displays the **expected output** of each underlying token. For example, unwrapping 1 _Meme Basket_ token might return 5 DOGE and 1000 SHIB (depending on index composition and current valuations). The breakdown will list each component token and the amount the user will receive. This mirrors the index’s composition, ensuring the user gets the proportional share of each asset.

- **Valuation (optional):** The interface could show the total estimated USD value of the output tokens (and perhaps compare it to the current value of the index token) to reassure the user that unwrapping yields the equivalent value (minus any fees).

- **Unwrap Button:** A button to execute the unwrapping (redeeming) transaction. Upon success, the specified amount of index tokens will be burned and the corresponding underlying tokens will be transferred to the user’s wallet. Status feedback (pending, success, error) is provided just like in the Wrap case.

- **Transaction States:** Because unwrapping might involve multiple transfers out to the user (one for each token type), the UI should update as each part completes or once the whole transaction is confirmed. For instance, it might list each token with a checkmark as they are received, or simply one confirmation when all are done (depending on how the smart contract operates).

By supporting both wrap and unwrap, the platform allows users not only to trade index tokens on the market but also to directly interact with the index’s underlying assets. This means the index token can always be **redeemed** for its basket, maintaining a price closely tied to the underlying value . It provides transparency and trust: if an index token is undervalued relative to its assets, arbitrageurs can buy and unwrap it; if overvalued, they can wrap new ones. The UI makes these complex actions accessible with a clean form-based approach.

## Dashboard Page (Holdings & Analytics)

The **Dashboard** is a personalized page for users to view and manage their holdings. It typically requires the user to connect their cryptocurrency wallet, as it will display wallet-specific information. The page is divided into sections to show what index tokens the user owns and what underlying assets (ERC-20 tokens) they have available.

- **Wallet Integration Panel:** At the top of the dashboard (or as a modal if the user is not yet connected), there is a **Connect Wallet** button. Upon connection (e.g. via MetaMask or WalletConnect), the UI will display the user’s wallet address (truncated for brevity) and perhaps a summary of their total portfolio value. The dashboard uses the wallet context to fetch on-chain data about the user’s balances. Once connected, this panel might show a quick overview like “Connected: 0xABC...1234 | Ethereum Mainnet” and a **balance summary** (e.g. total value of assets). Using React Context to manage the wallet state ensures that once connected, any part of the app can know the user’s address and update the UI accordingly .

- **Index Holdings Section:** This section lists all the Zetaidx index tokens the user holds in their wallet. Each holding can be shown in a card or row format, including:

  - **Token Name & Symbol:** e.g. _Meme Basket (ZIDX-MEME)_.
  - **Amount Held:** how many index tokens the user has.
  - **Current Value:** conversion of that amount to a fiat value (USD, etc.) or to the underlying asset value. This helps the user see the monetary value.
  - **Composition Preview:** On hover or click, it could display a mini pie chart or tooltip showing the breakdown of underlying assets in that index (essentially the same chart from the Indexes page card, but reflecting the user’s portion). For example, hovering on a _DeFi Index_ holding might show “50% AAVE, 25% UNI, 25% COMP” etc. This gives insight into what the user actually owns through the index.
  - **Performance Sparkline:** A small sparkline chart showing the historical performance of that index token (perhaps over the last 30 days). This provides a quick visual cue if the index is trending up or down.

  By presenting their index holdings, the dashboard helps users track how their diversified investments are doing without manually checking each asset. The design is such that it's easy to scan multiple holdings. If the user has none of a certain index, that index simply won’t appear here.

- **ERC-20 Assets Section:** Below the indexes, the dashboard can list the user’s balances of individual tokens that are relevant to Zetaidx – primarily those that can be wrapped. This might include the various assets that compose any of the indexes (for example, if an index is made of ETH, MATIC, LINK, this section shows how much ETH, MATIC, LINK the user holds). This section is useful for the wrapping workflow, since it shows what the user has available to contribute. Each asset row might display:
  - Token name (and symbol)
  - Amount in wallet
  - Current fiat value
  - Perhaps an “Add to Wrap” shortcut – e.g. a button to jump to the Wrap tab with that token pre-selected if applicable.

Having the ERC-20 list also makes the dashboard a mini portfolio tracker. It provides the user an overview of both their indexed investments and individual assets in one place. The UI should clearly distinguish between the index token holdings and the raw asset holdings, possibly with subheadings or cards, to avoid confusion.

Overall, the Dashboard is **user-centric**, updating in real-time (or on a refresh trigger) as the user’s wallet changes. It uses contextual data from the blockchain and presents it in an organized way. By integrating the wallet via context and hooks, the app can react to changes (like if the user buys more of an index, the holdings section updates accordingly). This design empowers users to monitor their investments and make informed decisions (like wrapping more tokens or trading an index) all in one place.

## Info Page

The **Info** page provides background and support information about the Zetaidx platform. It is mostly a static content page with some interactive elements for FAQs. Its main sections include:

- **About Zetaidx:** A brief explainer of what Zetaidx is and how it works. This section might be a few paragraphs describing the platform’s mission (e.g. making crypto diversification simple), the underlying mechanisms (for instance, that each index is managed by smart contracts and possibly that it sources liquidity via decentralized exchanges), and any unique features (such as _“cross-chain indexing”_ or _“automatic rebalancing”_ if those are part of the offering). It could mention how index composition is determined (methodology), how often it rebalances, and how liquidity is provided for trading. The goal is to educate users and build trust by highlighting things like audits or security measures. For example, it might explain that Zetaidx routes trades through liquidity pools and possibly across chains if the assets span multiple blockchains (though the technical detail might be kept light here).

- **Quick Links:** A set of call-to-action buttons or links that direct users to external resources:

  - **Documentation:** Developer or user docs for those who want in-depth technical or usage info.
  - **Audits:** Links to smart contract audit reports for security transparency.
  - **GitHub:** Link to the project’s open-source code repositories.
  - **Twitter, Discord:** Social channels for community and updates.

  These links are typically presented as a list of buttons or icons. They help users easily find more information or engage with the community. Providing access to audits in particular is important in DeFi projects to reassure users about safety.

- **FAQs:** A frequently asked questions section, likely presented in an accordion style (each question can expand to reveal the answer). This format keeps the page from being too cluttered while allowing users to drill into topics of interest. Example FAQs might include:

  - “How are index token prices determined?”
  - “What happens during rebalancing?”
  - “Are there fees for wrapping or unwrapping?”
  - “Which wallets are supported?”

  Each FAQ can be expanded with a smooth animation to show the answer text, then collapsed. This improves the information architecture by hiding details until needed.

- **Disclaimers & Legal:** At the bottom, there will be the typical disclaimers (for example, noting that nothing is financial advice, that cryptocurrencies carry risk, etc.) and any legal terms or licensing information. This might be in smaller text and could be within a scrollable text box if it’s lengthy. Even though not the most exciting part of the UI, it’s crucial for compliance and setting user expectations. The design should ensure this section is present but not intrusive to the user experience (perhaps a dimmer font color and smaller size, but still readable).

The Info page thus serves as the knowledge base for the product. It is designed in a clear, user-friendly way—using headings, bullet points, and collapsible sections—to convey a lot of information without overwhelming the reader. All static text is managed via the internationalization system as well (so the “About” text and FAQs can appear in the user’s selected language).

## Global UI Behaviors & Architecture

Beyond the individual pages, several global design and technical considerations ensure the app is smooth, consistent, and maintainable:

- **Internationalization (i18n):** The app supports multiple languages. All user-facing strings are managed through JSON resource files (e.g. an `english.json` for English) and integrated using Next.js i18n frameworks. Using a library like **Next-i18next** centralizes the translations and allows easy switching of languages without page reload . The language selector in the header triggers this switch. This ensures Zetaidx is accessible to a wider audience and all content (navigation, labels, messages, etc.) can be translated.

- **State Management:** The application makes use of **React Context** to manage global state such as the connected wallet info, the currently selected tokens in forms, and UI theme or filter selections. Context provides a way to pass data through the component tree without prop drilling, making state easier to manage and maintain . For example, a WalletContext provides the current account and network to any component that needs it (the Dashboard, the nav bar, etc.), and a ThemeContext could toggle dark mode. This choice avoids the overhead of a larger state library for relatively straightforward state needs and keeps the app snappy.

- **Form Handling & Validation:** Wherever the app takes user input (the swap form, wrap/unwrap form, etc.), **React Hook Form** is used for building the form and managing its state, and **Zod** is used for schema validation of inputs. This combination ensures a robust handling of form data: React Hook Form provides efficient, minimal re-render form state management, and Zod provides a TypeScript-friendly way to define validation rules for each field (e.g. number must be positive, required fields filled, valid addresses, etc.). Using Zod’s schema, the app can enforce correct input formats and even share these rules between front-end and back-end if needed. This leads to safer and more user-friendly forms – users get immediate feedback on incorrect inputs. Integrating Zod validation with React Hook Form also guarantees that the data is _clean and consistent_ before it’s used, reducing runtime errors and improving user experience .

- **Charts (Data Visualization):** Zetaidx uses **shadcn/ui** components for charts, which under the hood leverage the Recharts library for robust chart rendering . This allows the platform to display complex data (like historical performance or asset breakdowns) in a visually appealing and consistent manner.

- **Animations & Transitions:** For interactive polish, the app uses **React Spring** to handle animations. React Spring’s spring-physics based animations create a natural, fluid feel for UI transitions , which enhances the user experience without being too flashy. All animations are kept light and fast so as not to hinder the snappy interaction (and they respect the user’s reduced motion preferences for accessibility).

- **Visual Style:** The design language of Zetaidx is professional and modern. It likely uses a framework like Tailwind CSS (since shadcn/ui is Tailwind-based) to ensure consistency in spacing, colors, and typography. The style emphasizes **clean layout** with plenty of whitespace, making information digestible. Soft shadows and rounded corners are used to create a sense of depth without heavy skeuomorphism. Typography is clear and legible, using modern web-safe fonts that match the brand. The interface supports **dark mode** seamlessly, with colors and chart palettes adjusting for a dark background – a critical feature as many crypto users prefer dark theme for extensive use. All components are tested in both light and dark to maintain readability and aesthetic in each. The color scheme likely uses a neutral background with vibrant accents for interactive elements (e.g. buttons or highlights in the charts) to draw attention to key actions and data points.

- **Responsiveness:** From the ground up, the UI is built to be responsive and mobile-friendly. On small screens (mobile devices), the layout changes:

  - The header may condense into a mobile menu; navigation could become a bottom bar or a slide-out drawer.
  - The Indexes grid might collapse into a single-column list for easy vertical scrolling.
  - Charts might simplify or become horizontally scrollable if too wide.
  - Forms (like Swap or Wrap) stack their fields vertically with larger touch-friendly buttons.

  Each page is tested at various breakpoints to ensure functionality is retained. For example, on a phone, the Trade page might show the swap form first and the chart below it (instead of side by side as on desktop). Interactive elements are made bigger for touch. By using responsive design techniques (flexbox/grid and relative units), the app provides an optimal experience on all devices. This broadens the reach of Zetaidx, allowing users to check indexes or perform trades on the go.

In summary, Zetaidx’s UI/UX is thoughtfully designed to make complex DeFi concepts (like index tokens, swaps, and multi-token wraps) intuitive and accessible. Each page has a clear purpose and presents information in a digestible format using headings, short descriptive text, and visuals like icons and charts. Under the hood, modern libraries and best practices (internationalization, context for state, form validation, etc.) ensure the app is robust, secure, and user-friendly. All these elements work together to provide a seamless experience where users can confidently explore indexes, make trades, and manage their portfolio with ease and trust. The comprehensive design aims to educate users (through the Info page and contextual cues) while empowering them to take advantage of diversified crypto investing through a polished, responsive interface.
Perfect. I’ll create a complete V0 prompt for the Zetaidx app, covering all key pages and UI components with structured, hierarchical descriptions optimized for high-quality visual prototyping and real-time rendering in V0 by Vercel. I’ll include all the components, layout behaviors, placeholder text, and state transitions to ensure a seamless experience for both beginners and advanced DeFi users. I’ll share it with you shortly.

# Zetaidx Platform UI/UX Design Overview

**Zetaidx** is a decentralized crypto index platform offering tokens that represent baskets of cryptocurrencies. The application features a navigational shell and several pages (Indexes, Trade, Wrap/Unwrap, Dashboard, Info), each designed for a specific set of user interactions. Below is a detailed breakdown of the UI layout and key components for each section of the Zetaidx web app, with design considerations and best practices.

## Top-Level Layout (App Shell)

The app’s shell consists of a **sticky header** navigation bar available across all pages. This header ensures users can quickly switch sections and is fixed to the top for easy access. It includes:

- **Logo:** Positioned on the left for brand identity.
- **Main Navigation Links:** Clearly labeled links to core pages:
  - `Dashboard`
  - `Indexes`
  - `Trade`
  - `Wrap/Unwrap`
  - `Info`
- **Language Selector:** A locale dropdown on the top-right (leveraging Next.js i18n). This allows switching the interface language. (Built with a library such as Next-i18next, a popular Next.js plugin for managing translations .)

The sticky header uses a responsive layout so that on smaller screens the nav links might collapse into a menu (hamburger or dropdown), ensuring the design remains mobile-friendly. Overall, this consistent app shell provides intuitive global navigation.

## Indexes Page

.\_

The **Indexes** page is the main landing for exploring Zetaidx’s index token offerings. It gives users an overview of all available index tokens, each representing a diversified basket of crypto assets (each index token is backed by a reserve of underlying assets . Key sections of this page include:

- **Page Title & Subtitle:** At the top, a prominent title “Explore Index Tokens” with a subtitle like “Diversified exposure across crypto markets — backed by real assets.” This explains the purpose of index tokens (one token gives exposure to many assets, as the underlying reserves back its value and sets context for the user.

- **Filters & Sorting Toolbar:** A control bar that lets users refine and order the list of indexes. Users can filter by _Theme_ (e.g. Meme tokens, DeFi, Blue-Chip) and sort by metrics like Total Volume, TVL (total value locked), or recent performance. There is also a toggle to switch between a **grid view** and a **list view**, accommodating user preference for how information is displayed. These tools help users quickly find indices that fit their interest (for example, filtering to see only DeFi index products).

- **Index Token Grid:** The core of the page is a grid of **Index Cards**, each summarizing an index token. In grid view, cards provide a visual snapshot of each index:

  - **Token Icon & Name:** A logo or icon for the index, with its name (e.g. _“Meme Basket”_) and symbol (e.g. _ZIDX-MEME_) clearly labeled.
  - **Brief Description:** One sentence summary (e.g. “Top-performing meme tokens bundled in one index.”) describing the index’s theme or strategy.
  - **Composition Pie Chart:** A small pie chart (using Shadcn UI charts) illustrating the index’s asset composition (the percentage allocation of each constituent token). This gives a quick visual sense of the portfolio split.
  - **Key Metrics:** A few critical performance indicators:
    - **7D% / 30D% Performance:** Percentage change over the last 7 days and 30 days.
    - **TVL (Total Value Locked):** The current value of all assets in this index (liquidity backing the index).
    - **24H Volume:** Trading volume of the index token in the last 24 hours.
  - **CTA Button:** A call-to-action like “View / Trade” that brings the user to that index’s detailed page or trade interface.

  Each card is designed to be informative yet compact, so users can scan multiple index offerings at a glance. The use of a composition chart on the card helps convey diversification benefits visually. (The idea of bundling assets is to simplify investing; instead of buying many tokens individually, a user can hold one index token .)

In list view (if toggled), the same information might be presented in a table-like format spanning the page width, which could make it easier to compare metrics across indexes directly. Regardless of view, the combination of text and visuals on the Indexes page helps users understand and compare various index tokens quickly.

## Trade Page

The **Trade** page provides a swapping interface for users to exchange their tokens for Zetaidx index tokens (and vice versa) in a simple and familiar way. It is akin to a typical decentralized exchange (DEX) swap UI with some additional context for indexes. The layout is centered and focused for user attention, containing:

- **Swap Interface Panel:** A card or modal centered on the page with the title “Swap Tokens”. This panel contains the core swap controls.

  - **“From” Token Selector:** A dropdown menu for the token the user wants to swap _from_. This will list supported input tokens (for example, stablecoins like USDC or ETH that the user can spend).
  - **“To” Token Selector:** A dropdown for the token the user wants to swap _to_. In this context, it would list the available index tokens (the ZIDX tokens). Upon selecting an index, the interface may show its icon and symbol.
  - These selectors likely integrate with the user’s wallet to show balances for each token and may have a quick “max” button to fill in the maximum available amount .

- **Amount Input & Preview:** An input field where the user enters the amount of the “From” token they want to swap. As they type:

  - The UI shows an **estimated output** amount for the “To” token, based on current exchange rate.
  - The exchange rate (price) is displayed (e.g. 1 Index Token = X USDC).
  - **Slippage Warning:** If the price impact or slippage of the trade is above a certain threshold (for example, if liquidity is low causing >1% slippage), the UI can display a warning or highlight. This alerts the user that the execution price may differ significantly from the current rate. (High slippage is a sign of low liquidity or large trade size, which may result in worse rates .) Users might be able to adjust their slippage tolerance in advanced settings.

- **Price Chart Panel:** Next to or below the swap inputs, a small chart is provided showing the price trend of the selected index token (with a toggle for 24h or 7d view). This gives context about the asset’s recent performance as the user trades. For example, before swapping into an index, the user can see if its price has been rising or falling over the past week. (Providing such a chart within the swap interface adds transparency and helps users make informed decisions without leaving the page.)

- **Liquidity Alert:** If the particular index token’s liquidity pool is low (which could lead to high slippage or volatility in price), an alert message like “⚠️ Low pool liquidity may impact pricing.” is shown. This prepares users for potential slippage or failure in trade execution due to insufficient liquidity.

- **Swap Button:** A prominent button to execute the swap. This button has multiple states for a smooth UX:
  - **Idle State:** Default state when the form is ready (e.g. “Swap”).
  - **Loading State:** When the transaction is being submitted (e.g. a spinner indicating the swap is in progress).
  - **Success State:** After a successful swap (could show a checkmark or a “Success” message).
  - **Error State:** If something goes wrong (for example, insufficient balance, slippage too high, or transaction rejected), an error message or toast notification is shown. The design should promptly inform the user and possibly suggest remediation (like adjusting slippage or trying a smaller amount).

.\_

Additionally, advanced details (often hidden under a toggle or shown on a confirmation step) can include information such as minimum amount to be received (after slippage), price impact, and fees. As a best practice, if slippage tolerance is displayed, allowing the user to edit it on the fly (as shown above) is considered a helpful “accelerator” for power users . The Trade page in Zetaidx follows familiar patterns from popular DEXs so users feel comfortable, but with added context (charts, warnings) tailored for trading index tokens.

## Wrap/Unwrap Page

The **Wrap/Unwrap** page is where users can create (mint) new index tokens by depositing the underlying assets (_wrapping_), or break an index token back into its constituents (_unwrapping_). This page uses a tabbed interface to separate the two related actions:

- **Tabs:** At the top of this page, two tabs allow the user to switch between **Wrap** and **Unwrap**. The interface under each tab changes accordingly. Smooth transitions (with a subtle animation when switching) make it clear that the user is toggling between two modes of a related feature.

### Wrap Tab

Under the **Wrap** tab, the UI presents a form that lets the user input multiple ERC-20 tokens which correspond to the components of a selected index. The goal is to deposit the correct proportions of each asset to mint the index token. Key elements include:

- **Index Selection (optional):** If multiple index products exist, the user might first choose which index they want to mint. This selection could auto-fill the required token types and their target ratios.

- **Multi-Token Input Form:** A series of input rows, one for each required token in the index’s basket. For example, if _ZIDX-MEME_ index consists of 50% DOGE and 50% SHIB, the form will have two rows:

  - Each row has a **Token Selector** (pre-selected or fixed to the required token, e.g. DOGE) and an **Amount field** where the user enters how much of that token to supply.
  - If the index has many components, all are listed with their respective selectors and inputs. There may be an option to “Add all” or fill with proportional amounts.

- **Required Proportions Guidance:** The UI should guide the user on the required ratio of inputs. This could be done by placeholder text or sub-labels on each row indicating something like “requires 50% of total basket” or “proportion: 1:1” etc. As the user fills one of the amounts, the form might calculate and suggest the amounts needed for the other tokens to meet the index allocation. For instance, if the user enters 100 USDC for a basket that is 50% USDC and 50% WBTC, the form could indicate that they need approximately $100 worth of WBTC as well.

- **Output Estimate:** As the user enters the token amounts to wrap, the interface shows how many **Zetaidx index tokens** will be minted as a result. For example, “You will receive 1.2 ZIDX-MEME tokens” based on the current index token price or the net asset value of the basket. This helps set expectations before submission.

- **Wrap Button:** A button to execute the wrap (mint) transaction, which will likely call a smart contract to bundle the assets. As with swaps, it will have loading and success states, and possibly a transaction progress indicator since wrapping might involve multiple token transfers. Upon success, the user’s wallet will have the new index tokens.

- **Transaction Feedback:** Given wrapping might involve multiple assets being transferred from the user, the UI should provide clear feedback: e.g. a pending status (“Wrapping in progress…”) and a confirmation (“Success! You have minted X ZIDX tokens.”). If the transaction fails (e.g. user doesn’t approve one of the tokens or sends insufficient amount), a clear error is shown.

Notably, by allowing users to wrap, Zetaidx ensures the index tokens are **mintable** by anyone providing the underlying assets in the right proportions (similar to how index fund tokens can be created by depositing constituents) . This aligns with decentralized principles: the index token represents real assets that the user has contributed, and in return they receive the single index token.

### Unwrap Tab

The **Unwrap** tab is effectively the reverse process. The user can redeem an index token to get back the underlying assets.

- **Index Token Input:** The user specifies how many Zetaidx index tokens they want to unwrap (e.g. “Enter amount of ZIDX-MEME to unwrap”). They might use a slider or a max button to select up to the full balance they hold.

- **Output Breakdown:** Once the amount is entered, the UI calculates and displays the **expected output** of each underlying token. For example, unwrapping 1 _Meme Basket_ token might return 5 DOGE and 1000 SHIB (depending on index composition and current valuations). The breakdown will list each component token and the amount the user will receive. This mirrors the index’s composition, ensuring the user gets the proportional share of each asset.

- **Valuation (optional):** The interface could show the total estimated USD value of the output tokens (and perhaps compare it to the current value of the index token) to reassure the user that unwrapping yields the equivalent value (minus any fees).

- **Unwrap Button:** A button to execute the unwrapping (redeeming) transaction. Upon success, the specified amount of index tokens will be burned and the corresponding underlying tokens will be transferred to the user’s wallet. Status feedback (pending, success, error) is provided just like in the Wrap case.

- **Transaction States:** Because unwrapping might involve multiple transfers out to the user (one for each token type), the UI should update as each part completes or once the whole transaction is confirmed. For instance, it might list each token with a checkmark as they are received, or simply one confirmation when all are done (depending on how the smart contract operates).

By supporting both wrap and unwrap, the platform allows users not only to trade index tokens on the market but also to directly interact with the index’s underlying assets. This means the index token can always be **redeemed** for its basket, maintaining a price closely tied to the underlying value . It provides transparency and trust: if an index token is undervalued relative to its assets, arbitrageurs can buy and unwrap it; if overvalued, they can wrap new ones. The UI makes these complex actions accessible with a clean form-based approach.

## Dashboard Page (Holdings & Analytics)

The **Dashboard** is a personalized page for users to view and manage their holdings. It typically requires the user to connect their cryptocurrency wallet, as it will display wallet-specific information. The page is divided into sections to show what index tokens the user owns and what underlying assets (ERC-20 tokens) they have available.

- **Wallet Integration Panel:** At the top of the dashboard (or as a modal if the user is not yet connected), there is a **Connect Wallet** button. Upon connection (e.g. via MetaMask or WalletConnect), the UI will display the user’s wallet address (truncated for brevity) and perhaps a summary of their total portfolio value. The dashboard uses the wallet context to fetch on-chain data about the user’s balances. Once connected, this panel might show a quick overview like “Connected: 0xABC...1234 | Ethereum Mainnet” and a **balance summary** (e.g. total value of assets). Using React Context to manage the wallet state ensures that once connected, any part of the app can know the user’s address and update the UI accordingly .

- **Index Holdings Section:** This section lists all the Zetaidx index tokens the user holds in their wallet. Each holding can be shown in a card or row format, including:

  - **Token Name & Symbol:** e.g. _Meme Basket (ZIDX-MEME)_.
  - **Amount Held:** how many index tokens the user has.
  - **Current Value:** conversion of that amount to a fiat value (USD, etc.) or to the underlying asset value. This helps the user see the monetary value.
  - **Composition Preview:** On hover or click, it could display a mini pie chart or tooltip showing the breakdown of underlying assets in that index (essentially the same chart from the Indexes page card, but reflecting the user’s portion). For example, hovering on a _DeFi Index_ holding might show “50% AAVE, 25% UNI, 25% COMP” etc. This gives insight into what the user actually owns through the index.
  - **Performance Sparkline:** A small sparkline chart showing the historical performance of that index token (perhaps over the last 30 days). This provides a quick visual cue if the index is trending up or down.

  By presenting their index holdings, the dashboard helps users track how their diversified investments are doing without manually checking each asset. The design is such that it's easy to scan multiple holdings. If the user has none of a certain index, that index simply won’t appear here.

- **ERC-20 Assets Section:** Below the indexes, the dashboard can list the user’s balances of individual tokens that are relevant to Zetaidx – primarily those that can be wrapped. This might include the various assets that compose any of the indexes (for example, if an index is made of ETH, MATIC, LINK, this section shows how much ETH, MATIC, LINK the user holds). This section is useful for the wrapping workflow, since it shows what the user has available to contribute. Each asset row might display:
  - Token name (and symbol)
  - Amount in wallet
  - Current fiat value
  - Perhaps an “Add to Wrap” shortcut – e.g. a button to jump to the Wrap tab with that token pre-selected if applicable.

Having the ERC-20 list also makes the dashboard a mini portfolio tracker. It provides the user an overview of both their indexed investments and individual assets in one place. The UI should clearly distinguish between the index token holdings and the raw asset holdings, possibly with subheadings or cards, to avoid confusion.

Overall, the Dashboard is **user-centric**, updating in real-time (or on a refresh trigger) as the user’s wallet changes. It uses contextual data from the blockchain and presents it in an organized way. By integrating the wallet via context and hooks, the app can react to changes (like if the user buys more of an index, the holdings section updates accordingly). This design empowers users to monitor their investments and make informed decisions (like wrapping more tokens or trading an index) all in one place.

## Info Page

The **Info** page provides background and support information about the Zetaidx platform. It is mostly a static content page with some interactive elements for FAQs. Its main sections include:

- **About Zetaidx:** A brief explainer of what Zetaidx is and how it works. This section might be a few paragraphs describing the platform’s mission (e.g. making crypto diversification simple), the underlying mechanisms (for instance, that each index is managed by smart contracts and possibly that it sources liquidity via decentralized exchanges), and any unique features (such as _“cross-chain indexing”_ or _“automatic rebalancing”_ if those are part of the offering). It could mention how index composition is determined (methodology), how often it rebalances, and how liquidity is provided for trading. The goal is to educate users and build trust by highlighting things like audits or security measures. For example, it might explain that Zetaidx routes trades through liquidity pools and possibly across chains if the assets span multiple blockchains (though the technical detail might be kept light here).

- **Quick Links:** A set of call-to-action buttons or links that direct users to external resources:

  - **Documentation:** Developer or user docs for those who want in-depth technical or usage info.
  - **Audits:** Links to smart contract audit reports for security transparency.
  - **GitHub:** Link to the project’s open-source code repositories.
  - **Twitter, Discord:** Social channels for community and updates.

  These links are typically presented as a list of buttons or icons. They help users easily find more information or engage with the community. Providing access to audits in particular is important in DeFi projects to reassure users about safety.

- **FAQs:** A frequently asked questions section, likely presented in an accordion style (each question can expand to reveal the answer). This format keeps the page from being too cluttered while allowing users to drill into topics of interest. Example FAQs might include:

  - “How are index token prices determined?”
  - “What happens during rebalancing?”
  - “Are there fees for wrapping or unwrapping?”
  - “Which wallets are supported?”

  Each FAQ can be expanded with a smooth animation to show the answer text, then collapsed. This improves the information architecture by hiding details until needed.

- **Disclaimers & Legal:** At the bottom, there will be the typical disclaimers (for example, noting that nothing is financial advice, that cryptocurrencies carry risk, etc.) and any legal terms or licensing information. This might be in smaller text and could be within a scrollable text box if it’s lengthy. Even though not the most exciting part of the UI, it’s crucial for compliance and setting user expectations. The design should ensure this section is present but not intrusive to the user experience (perhaps a dimmer font color and smaller size, but still readable).

The Info page thus serves as the knowledge base for the product. It is designed in a clear, user-friendly way—using headings, bullet points, and collapsible sections—to convey a lot of information without overwhelming the reader. All static text is managed via the internationalization system as well (so the “About” text and FAQs can appear in the user’s selected language).

## Global UI Behaviors & Architecture

Beyond the individual pages, several global design and technical considerations ensure the app is smooth, consistent, and maintainable:

- **Internationalization (i18n):** The app supports multiple languages. All user-facing strings are managed through JSON resource files (e.g. an `english.json` for English) and integrated using Next.js i18n frameworks. Using a library like **Next-i18next** centralizes the translations and allows easy switching of languages without page reload . The language selector in the header triggers this switch. This ensures Zetaidx is accessible to a wider audience and all content (navigation, labels, messages, etc.) can be translated.

- **State Management:** The application makes use of **React Context** to manage global state such as the connected wallet info, the currently selected tokens in forms, and UI theme or filter selections. Context provides a way to pass data through the component tree without prop drilling, making state easier to manage and maintain . For example, a WalletContext provides the current account and network to any component that needs it (the Dashboard, the nav bar, etc.), and a ThemeContext could toggle dark mode. This choice avoids the overhead of a larger state library for relatively straightforward state needs and keeps the app snappy.

- **Form Handling & Validation:** Wherever the app takes user input (the swap form, wrap/unwrap form, etc.), **React Hook Form** is used for building the form and managing its state, and **Zod** is used for schema validation of inputs. This combination ensures a robust handling of form data: React Hook Form provides efficient, minimal re-render form state management, and Zod provides a TypeScript-friendly way to define validation rules for each field (e.g. number must be positive, required fields filled, valid addresses, etc.). Using Zod’s schema, the app can enforce correct input formats and even share these rules between front-end and back-end if needed. This leads to safer and more user-friendly forms – users get immediate feedback on incorrect inputs. Integrating Zod validation with React Hook Form also guarantees that the data is _clean and consistent_ before it’s used, reducing runtime errors and improving user experience .

- **Charts (Data Visualization):** Zetaidx uses **shadcn/ui** components for charts, which under the hood leverage the Recharts library for robust chart rendering . This allows the platform to display complex data (like historical performance or asset breakdowns) in a visually appealing and consistent manner.

- **Animations & Transitions:** For interactive polish, the app uses **React Spring** to handle animations. React Spring’s spring-physics based animations create a natural, fluid feel for UI transitions , which enhances the user experience without being too flashy. All animations are kept light and fast so as not to hinder the snappy interaction (and they respect the user’s reduced motion preferences for accessibility).

- **Visual Style:** The design language of Zetaidx is professional and modern. It likely uses a framework like Tailwind CSS (since shadcn/ui is Tailwind-based) to ensure consistency in spacing, colors, and typography. The style emphasizes **clean layout** with plenty of whitespace, making information digestible. Soft shadows and rounded corners are used to create a sense of depth without heavy skeuomorphism. Typography is clear and legible, using modern web-safe fonts that match the brand. The interface supports **dark mode** seamlessly, with colors and chart palettes adjusting for a dark background – a critical feature as many crypto users prefer dark theme for extensive use. All components are tested in both light and dark to maintain readability and aesthetic in each. The color scheme likely uses a neutral background with vibrant accents for interactive elements (e.g. buttons or highlights in the charts) to draw attention to key actions and data points.

- **Responsiveness:** From the ground up, the UI is built to be responsive and mobile-friendly. On small screens (mobile devices), the layout changes:

  - The header may condense into a mobile menu; navigation could become a bottom bar or a slide-out drawer.
  - The Indexes grid might collapse into a single-column list for easy vertical scrolling.
  - Charts might simplify or become horizontally scrollable if too wide.
  - Forms (like Swap or Wrap) stack their fields vertically with larger touch-friendly buttons.

  Each page is tested at various breakpoints to ensure functionality is retained. For example, on a phone, the Trade page might show the swap form first and the chart below it (instead of side by side as on desktop). Interactive elements are made bigger for touch. By using responsive design techniques (flexbox/grid and relative units), the app provides an optimal experience on all devices. This broadens the reach of Zetaidx, allowing users to check indexes or perform trades on the go.

In summary, Zetaidx’s UI/UX is thoughtfully designed to make complex DeFi concepts (like index tokens, swaps, and multi-token wraps) intuitive and accessible. Each page has a clear purpose and presents information in a digestible format using headings, short descriptive text, and visuals like icons and charts. Under the hood, modern libraries and best practices (internationalization, context for state, form validation, etc.) ensure the app is robust, secure, and user-friendly. All these elements work together to provide a seamless experience where users can confidently explore indexes, make trades, and manage their portfolio with ease and trust. The comprehensive design aims to educate users (through the Info page and contextual cues) while empowering them to take advantage of diversified crypto investing through a polished, responsive interface.
