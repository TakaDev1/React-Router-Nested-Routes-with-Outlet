# React Router Nested Routes with Outlet

React Routerの**Nested Routes（ネストされたルート）**と`<Outlet />`を使用して、ユーザー一覧とユーザー詳細ページを実装する練習アプリです。

## 目次

* [概要](#概要)
* [課題](#課題)
* [学習内容](#学習内容)
* [要件](#要件)
* [画面構成](#画面構成)
* [URL構成](#url構成)
* [ディレクトリ構成](#ディレクトリ構成)
* [実装のポイント](#実装のポイント)
* [処理の流れ](#処理の流れ)
* [使用技術](#使用技術)
* [起動方法](#起動方法)

## 概要

`/users`ページにユーザー一覧を表示し、ユーザー名をクリックすると`/users/:id`へ遷移して、選択したユーザーの詳細情報を表示します。

React RouterのNested Routesと`<Outlet />`を使用して、親ルートと子ルートの関係を理解することを目的としています。

## 課題

### 問題文

`/users`ページにユーザーのリストを表示し、クリックすると`/users/:id`に遷移して詳細情報を表示してください。

### 条件

1. `<Outlet />`を使用する
2. 親コンポーネントはユーザーリストを表示し、子ルートで詳細を表示する
3. Tailwind CSSでユーザー名に`hover:text-blue-600`を付ける

## 学習内容

この課題では以下を学習します。

* Nested Routes
* 親ルートと子ルート
* `<Outlet />`
* `useParams()`
* URLパラメータ
* `Link`
* Tailwind CSSのhover
* React Routerによるページ遷移

## 要件

### ユーザー一覧

`/users`にアクセスするとユーザー一覧を表示します。

```text
Users

Alice
Bob
```

### ユーザー詳細

ユーザー名をクリックすると、以下のURLへ遷移します。

```text
/users/1
/users/2
```

詳細ページでは選択されたユーザーIDを表示します。

```text
Selected User ID: 1
```

## 画面構成

```text
/users
 │
 └── Users
      │
      ├── UserList
      │    ├── Alice → /users/1
      │    └── Bob   → /users/2
      │
      └── <Outlet />
             │
             └── UserDetail
```

## URL構成

| URL        | コンポーネント                | 内容       |
| ---------- | ---------------------- | -------- |
| `/users`   | `Users`                | ユーザー一覧   |
| `/users/1` | `Users` + `UserDetail` | Aliceの詳細 |
| `/users/2` | `Users` + `UserDetail` | Bobの詳細   |

Nested Routesでは、子ルートの

```tsx
<Route path=":id" element={<UserDetail />} />
```

が親ルート

```tsx
<Route path="/users" element={<Users />}>
```

にネストされています。

そのため、実際のURLは以下になります。

```text
/users/:id
```

## ディレクトリ構成

```text
src/
├── components/
│   └── UserList.tsx
├── pages/
│   ├── Users.tsx
│   └── UserDetail.tsx
├── data/
│   └── UsersData.ts
├── types/
│   └── User.ts
└── App.tsx
```

### 各ファイルの役割

#### `App.tsx`

React Routerのルートを定義します。

```text
BrowserRouter
└── Routes
    └── /users
        └── /:id
```

#### `Users.tsx`

親ルートのページです。

* ユーザー一覧を表示
* `<Outlet />`を配置
* 子ルートの内容を表示

#### `UserList.tsx`

ユーザー一覧を表示します。

`Link`を使用してユーザー詳細ページへ遷移します。

```tsx
<Link to={`/users/${user.id}`}>
  {user.name}
</Link>
```

また、ユーザー名に以下のTailwind CSSを設定します。

```text
hover:text-blue-600
```

#### `UserDetail.tsx`

子ルートとして表示されるページです。

`useParams()`を使用してURLの`id`を取得します。

```tsx
const { id } = useParams<"id">();
```

#### `UsersData.ts`

ユーザーのモックデータを管理します。

```ts
const UsersData = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];
```

#### `User.ts`

ユーザー情報の型を定義します。

```ts
export type User = {
  id: number;
  name: string;
};
```

## 実装のポイント

### 1. 親ルートに子ルートをネストする

```tsx
<Route path="/users" element={<Users />}>
  <Route path=":id" element={<UserDetail />} />
</Route>
```

親ルートと子ルートを組み合わせることで、

```text
/users/:id
```

というURLになります。

### 2. `<Outlet />`で子ルートを表示する

`Users.tsx`に`<Outlet />`を配置します。

```tsx
function Users() {
  return (
    <div>
      <h1>Users</h1>

      <UserList />

      <Outlet />
    </div>
  );
}
```

`/users/1`にアクセスすると、`UserDetail`が`<Outlet />`の位置に表示されます。

### 3. URLパラメータを取得する

`UserDetail.tsx`では`useParams()`を使用します。

```tsx
const { id } = useParams<"id">();
```

例えば、

```text
/users/1
```

にアクセスした場合、

```ts
id === "1"
```

となります。

### 4. `Link`でユーザー詳細へ遷移する

ユーザーごとにURLを生成します。

```tsx
<Link to={`/users/${user.id}`}>
  {user.name}
</Link>
```

例えば、

```text
Alice → /users/1
Bob   → /users/2
```

となります。

### 5. Tailwind CSSのhover

ユーザー名に以下を指定します。

```tsx
className="underline hover:text-blue-600"
```

ユーザー名にマウスカーソルを合わせると文字色が青色になります。

## 処理の流れ

```text
/users にアクセス
        ↓
Users.tsxを表示
        ↓
UserList.tsxでユーザー一覧を表示
        ↓
Aliceをクリック
        ↓
/users/1へ遷移
        ↓
親ルート Users が表示される
        ↓
子ルート UserDetail がマッチ
        ↓
<Outlet />の位置にUserDetailを表示
        ↓
useParams()でidを取得
        ↓
Selected User ID: 1
```

## 使用技術

* React
* TypeScript
* Vite
* React Router
* Tailwind CSS

## 起動方法

プロジェクトルートで以下を実行します。

```bash
npm install
```

開発サーバーを起動します。

```bash
npm run dev
```

ブラウザで表示されたURLへアクセスします。


## まとめ

この課題では、React Routerの**Nested Routes**を使用して、親ページと子ページを構成しました。

特に重要なのは、

```text
親Route
  ↓
子Route
  ↓
<Outlet />
```

という関係です。

`/users/:id`のような子ルートを`/users`の中に定義し、`<Outlet />`を使うことで、親ページの共通部分を維持したまま子ページの内容を差し込むことができます。
