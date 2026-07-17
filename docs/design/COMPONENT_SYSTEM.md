# Component System

## Layout primitives

- `Container`
- `Section`
- `Stack`
- `Cluster`
- `Split`
- `EditorialGrid`
- `Bleed`
- `Frame`

## UI

- `Button`
- `LinkButton`
- `TextLink`
- `IconButton`
- `StatusMessage`
- `LoadingState`
- `EmptyState`
- `ErrorState`

## Media

- `ResponsiveImage`
- `ResponsiveVideo`
- `MediaFrame`
- `MediaOverlay`
- `EditorialImage`
- `FocalImage`

## Food

- `PriceDisplay`
- `AllergenStatus`
- `DietaryTags`
- `MenuCategoryLink`
- `DishCard`
- `DishFeature`

## Offers

- `OfferBadge`
- `OfferValidity`
- `OfferCard`
- `OfferFeature`

## Forms

- `FormField`
- `TextInput`
- `TextArea`
- `Select`
- `Checkbox`
- `DateInput`
- `TimeInput`
- `FormMessage`
- `FieldError`
- `FormSection`

## Sections

- `EditorialIntro`
- `SectionHeading`
- `SplitMediaSection`
- `FullBleedMediaSection`
- `StatementSection`
- `BookingCallout`

## Regla de composicion

Los componentes no deben ocultar estados pendientes del modelo editorial. Si falta precio, alergeno o vigencia, el sistema lo muestra como deuda visible y no como ausencia silenciosa.
