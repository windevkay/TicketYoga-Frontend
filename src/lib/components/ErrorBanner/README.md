### Description

The ErrorBanner uses the `Ant Design` Alert component to render an error message at the top of the screen.

---

### Props

| Prop        |  Type  | Required | Description                          |
| ----------- | :----: | -------- | ------------------------------------ |
| message     | string | No       | A primary error message for the user |
| description | string | No       | Secondary message/description        |

---

### Implementation Example

```tsx
import { ErrorBanner } from "../../../components";

<ErrorBanner />;
```

---

### Libraries

- [AntDesign](https://ant.design/components/alert/)

---
