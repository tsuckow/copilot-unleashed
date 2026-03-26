# Changelog

## 1.0.0 (2026-03-26)


### Features

* accessibility, contrast audit, design tokens & reduced motion ([67db063](https://github.com/tsuckow/copilot-unleashed/commit/67db063d9a405d38ccfe2a8db64f03d621da4e7c))
* add BODY_SIZE_LIMIT environment variable and update CSP for image sources ([ff0ee40](https://github.com/tsuckow/copilot-unleashed/commit/ff0ee405e2a5e021acd1b3de9316af85b4982f6c))
* add push notification support and improve session handling in WebSocket ([5f0e954](https://github.com/tsuckow/copilot-unleashed/commit/5f0e954a3060015442fc2f40d5c0a95ce7ec2545))
* complete SDK features — Hooks, MCP timeout, Image vision ([#49](https://github.com/tsuckow/copilot-unleashed/issues/49), [#51](https://github.com/tsuckow/copilot-unleashed/issues/51), [#52](https://github.com/tsuckow/copilot-unleashed/issues/52)) ([#92](https://github.com/tsuckow/copilot-unleashed/issues/92)) ([dde5b95](https://github.com/tsuckow/copilot-unleashed/commit/dde5b954ffbafc1058d370adc21e97774cc13681))
* implement message queueing with send and cancel actions ([508b728](https://github.com/tsuckow/copilot-unleashed/commit/508b728911b5e6a3cfb2962bc9835392a0339f30))
* improve WebSocket reconnection and session management ([41d460e](https://github.com/tsuckow/copilot-unleashed/commit/41d460e65db31cb0fde5be323e3771c5a3ddce3b)), closes [#93](https://github.com/tsuckow/copilot-unleashed/issues/93)
* Phase 0+1 — Infrastructure, GHAS, GitHub Flow + SDK features ([fd75bed](https://github.com/tsuckow/copilot-unleashed/commit/fd75bed91dce218496b7dc5f554fd5f14ea419c0))
* populate chat history on session resume using session.getMessages() ([33566b9](https://github.com/tsuckow/copilot-unleashed/commit/33566b9e7c3f55c60b4eaf3069d275e7e8bfdaef)), closes [#106](https://github.com/tsuckow/copilot-unleashed/issues/106)
* SDK feature completion, UX improvements, security hardening ([0bff0b7](https://github.com/tsuckow/copilot-unleashed/commit/0bff0b79bdbcd8308ae47cb18933adee0780bad5))
* search issues across all visible repos without requiring GITHUB_REPO ([aa6dd8e](https://github.com/tsuckow/copilot-unleashed/commit/aa6dd8e17fd7c81f2b1bb7f914529f41c517f914))
* v4.0.0 — session persistence, PWA push, UI overhaul, Azure hardening ([75d1f65](https://github.com/tsuckow/copilot-unleashed/commit/75d1f65a70fa9f74d962d54107fda5647b08f839))


### Bug Fixes

* auth persistence via encrypted cookie + notification system hardening ([40ab171](https://github.com/tsuckow/copilot-unleashed/commit/40ab17116c400e2fde83d2dfaa80cbe76f643864))
* auth persistence via encrypted cookie + notification system hardening ([f98687b](https://github.com/tsuckow/copilot-unleashed/commit/f98687b9505edd4eeaf45885b2b81c4148c8f6df))
* clear auth cookie on token revocation before reloading ([632a254](https://github.com/tsuckow/copilot-unleashed/commit/632a254d7ff46e5a7b00bcad211dc53b937b8535))
* **deps:** upgrade vite to v8, override cookie to &gt;=0.7.0 ([2930dd0](https://github.com/tsuckow/copilot-unleashed/commit/2930dd00ad211c34666b02f4fb69ded08f7af491))
* guard auto-resubscribe against unconfigured VAPID (503) ([c8a8af3](https://github.com/tsuckow/copilot-unleashed/commit/c8a8af3d1713f7d8bb185e92b94398913651fca3))
* keep @ and # autocomplete popovers visible with error feedback ([cfc6974](https://github.com/tsuckow/copilot-unleashed/commit/cfc6974dc03fb9b6bb5d1dcaafe5b0a46b5f3d6b))
* pre-select model on new chat; no session restart on model change ([7546e4e](https://github.com/tsuckow/copilot-unleashed/commit/7546e4e5ff7f7d0e0c4b36da97774177f30bd41d))
* prevent replayed push notifications and improve re-subscription ([5b93421](https://github.com/tsuckow/copilot-unleashed/commit/5b93421eaeb574933fbf5f59dd8e1609f8a8b5e4))
* prevent scale-to-zero, fix CLI sessions, improve eviction ([091b7be](https://github.com/tsuckow/copilot-unleashed/commit/091b7be369e7ae2a966869b072b10713a71f0971))
* re-register push subscription on every WS connect to survive redeploy ([30ea7cc](https://github.com/tsuckow/copilot-unleashed/commit/30ea7cc1ee3a30e5fb3a2b20a9d54748e49b5404))
* restore types/index.ts truncated by editing error, re-apply replayed flag ([0a59995](https://github.com/tsuckow/copilot-unleashed/commit/0a59995be5a7f47c078ebbe009cac84b60e3d78c))
* **security:** rewrite VAPID key generator to avoid clear-text logging alerts ([0a0a0c2](https://github.com/tsuckow/copilot-unleashed/commit/0a0a0c2d1ba2d245d66c36ac7afb7a245589cbd8))
* tolerate missed heartbeats for backgrounded mobile PWAs ([07836ab](https://github.com/tsuckow/copilot-unleashed/commit/07836abf49ea85a218fecfad8089ed532530532e))
* treat GitHub 403 as transient error and restore localStorage for tabId ([7c34f3f](https://github.com/tsuckow/copilot-unleashed/commit/7c34f3f178c355a634d7aa150404821f7d5f97b2))
* update docker command syntax in README and package.json ([58166ff](https://github.com/tsuckow/copilot-unleashed/commit/58166ff7c5f56296015bf1d267edb3797cfb7213))
* use sessionStorage for tabId to prevent cross-device WebSocket disconnects ([d0a3aeb](https://github.com/tsuckow/copilot-unleashed/commit/d0a3aeb9baed062476ce39ff1e8a07a705a1db33))
* wire VAPID keys to Azure deployment via main.parameters.json ([31869b0](https://github.com/tsuckow/copilot-unleashed/commit/31869b0a4faeed733bfa3f385254c7543d032480))
