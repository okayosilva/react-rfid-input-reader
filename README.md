# React RFID Input Reader

A lightweight and flexible solution for integrating RFID readers into React applications. Designed to abstract the complexity of data capture, allowing you to attach reading logic to any existing input without compromising the UI/UX or visual structure of your project.

[![npm version](https://img.shields.io/npm/v/react-rfid-input-reader.svg)](https://www.npmjs.com/package/react-rfid-input-reader)
[![license](https://img.shields.io/npm/l/react-rfid-input-reader.svg)](https://github.com/okayosilva/react-rfid-input-reader/blob/main/LICENSE.md)

📦 **NPM:** [react-rfid-input-reader](https://www.npmjs.com/package/react-rfid-input-reader)

## 🎬 Demo

![RFID Scan Demo](./public/rfid-scan-ezgif.com-video-to-gif-converter.gif)

## ✨ Features

- 🎯 **Easy to use** - Ready-to-use hook with minimal configuration
- 🔧 **Highly configurable** - Customize size limits and timeout
- 📦 **Lightweight** - Zero external dependencies besides React
- 🎨 **Flexible** - Works with any HTML input or custom component
- 🔄 **Auto-focus** - Automatically keeps focus on input (configurable)
- 🎁 **Bonus modal** - Optional modal component for visual feedback (completely decoupled from the core logic)

## 📦 Installation

```bash
npm install react-rfid-input-reader
```

or

```bash
yarn add react-rfid-input-reader
```

or

```bash
pnpm add react-rfid-input-reader
```

## 🚀 Basic Usage

### Simple Input Example

```tsx
import { useRFIDReader } from "react-rfid-input-reader";

function RFIDInput() {
  const { inputRef, handleKeyDown } = useRFIDReader({
    onRead: (code) => {
      console.log("RFID code read:", code);
    },
  });

  return (
    <input
      ref={inputRef}
      onKeyDown={handleKeyDown}
      placeholder="Tap your RFID card..."
      style={{ opacity: 0, position: "absolute" }}
    />
  );
}
```

### Complete Example with Visual Feedback

```tsx
import { useState } from "react";
import { useRFIDReader, RfIdValidateModal } from "react-rfid-input-reader";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [lastCode, setLastCode] = useState("");

  const { inputRef, handleKeyDown } = useRFIDReader({
    onRead: async (code) => {
      setLastCode(code);
      setIsModalOpen(true);
      setStatus("loading");

      // Simulate code validation
      const isValid = await validateRFIDCode(code);
      setStatus(isValid ? "success" : "error");
    },
    minLength: 8,
    maxLength: 12,
    timeoutDuration: 500,
    active: true,
  });

  return (
    <div>
      <input
        ref={inputRef}
        onKeyDown={handleKeyDown}
        placeholder="Waiting for scan..."
      />

      <RfIdValidateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="RFID Validation"
        message="Processing scan..."
        status={status}
      >
        {status === "success" && <p>Valid code: {lastCode}</p>}
        {status === "error" && <p>Invalid code!</p>}
      </RfIdValidateModal>
    </div>
  );
}
```

## 📖 API

### `useRFIDReader`

Main hook for capturing RFID readings.

#### Parameters

| Property          | Type                     | Default      | Description                                    |
| ----------------- | ------------------------ | ------------ | ---------------------------------------------- |
| `onRead`          | `(code: string) => void` | **required** | Callback executed when a valid code is read    |
| `minLength`       | `number`                 | `8`          | Minimum code length to be considered valid     |
| `maxLength`       | `number`                 | `12`         | Maximum code length to be considered valid     |
| `timeoutDuration` | `number`                 | `500`        | Time (ms) to clear the buffer after inactivity |
| `active`          | `boolean`                | `true`       | Enables/disables reading and auto-focus        |

#### Return

| Property        | Type                          | Description                           |
| --------------- | ----------------------------- | ------------------------------------- |
| `inputRef`      | `RefObject<HTMLInputElement>` | Reference to attach to the input      |
| `handleKeyDown` | `(e: KeyboardEvent) => void`  | Keyboard event handler                |
| `focusInput`    | `() => void`                  | Function to force focus on the input  |
| `clearBuffer`   | `() => void`                  | Function to manually clear the buffer |

---

### `RfIdValidateModal` (Optional Bonus Component)

> ⚠️ **Note:** This modal is completely **optional** and **decoupled** from the core `useRFIDReader` hook. The hook works independently and you can use your own UI components for feedback. This modal is provided as a convenience bonus for quick prototyping or simple use cases.

Modal component for visual feedback during validation.

#### Props

| Property   | Type                                | Default                         | Description                      |
| ---------- | ----------------------------------- | ------------------------------- | -------------------------------- |
| `isOpen`   | `boolean`                           | **required**                    | Controls modal visibility        |
| `onClose`  | `() => void`                        | **required**                    | Callback when closing the modal  |
| `title`    | `string`                            | `"RFID Validation"`             | Modal title                      |
| `message`  | `string`                            | `"Waiting for card reading..."` | Message displayed during loading |
| `status`   | `'loading' \| 'success' \| 'error'` | `"loading"`                     | Visual state of the modal        |
| `children` | `ReactNode`                         | -                               | Custom content                   |

## 💡 How It Works

1. The hook monitors keyboard events on the referenced input
2. Typed characters are accumulated in an internal buffer
3. When `Enter` is pressed, the code is validated by length
4. If valid, the `onRead` callback is called with the code
5. The buffer is automatically cleared after the configured timeout

## 🔧 Use Cases

- **Access control** - Badge and card validation
- **Inventory** - Reading RFID tags on products
- **Time tracking** - Clock in/out registration
- **Events** - Attendee check-in

## 📄 License

MIT © [Kayo Silva](https://github.com/okayosilva)
