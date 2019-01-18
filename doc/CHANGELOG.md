<a name="1.0.1"></a>
## [1.0.1](https://github.com/aurelia/loader/compare/1.0.0...1.0.1) (2019-01-18)

* Add module to package.json.

<a name="1.0.0"></a>
# [1.0.0](https://github.com/aurelia/loader/compare/1.0.0-rc.1.0.0...v1.0.0) (2016-07-27)



<a name="1.0.0-rc.1.0.0"></a>
# [1.0.0-rc.1.0.0](https://github.com/aurelia/loader/compare/1.0.0-beta.2.0.1...v1.0.0-rc.1.0.0) (2016-06-22)



### 1.0.0-beta.1.2.1 (2016-05-10)


### 1.0.0-beta.1.2.0(2016-03-22)

* Update to Babel 6

### 1.0.0-beta.1.1.1 (2016-02-08)


### 1.0.0-beta.1.1.0 (2016-01-29)

* update jspm metadata; core-js; aurelia-deps

### 1.0.0-beta.1.0.1 (2016-01-08)


#### Bug Fixes

* **loader:** remove un-need core-js import ([aec5fa20](http://github.com/aurelia/loader/commit/aec5fa20eaefbce8b48383056e86459ce01b5bcf))


#### Features

* **loader:** add normalize api ([e5d5a9e5](http://github.com/aurelia/loader/commit/e5d5a9e551f8bf4ba1fc7a140fd787bc45cad3d9))


### 1.0.0-beta.1 (2015-11-16)


## 0.11.0 (2015-11-09)


#### Bug Fixes

* **template-registry-entry:** add onReady so its defined in ctor for perf ([33148ea4](http://github.com/aurelia/loader/commit/33148ea4b841dcb39f3217768c8cbe0ed174329f))


#### Features

* **all:** improved and locked down loader apis ([1174f436](http://github.com/aurelia/loader/commit/1174f436d33dbcd3dc70166cf4d31c9a90259fdf))


## 0.10.0 (2015-10-13)


#### Bug Fixes

* **all:**
  * update compiler and core-js imports ([a62dd4c3](http://github.com/aurelia/loader/commit/a62dd4c3a82ee9fba11f910a4ae3d0146f6c7ccb))
  * properly export the TemplateRegistryEntry ([4c60c8f7](http://github.com/aurelia/loader/commit/4c60c8f77b53f1a34ab7a1825305d81d99d4b7d6))
* **bower:** correct semver ranges ([430ba151](http://github.com/aurelia/loader/commit/430ba151e80add2bf57d049b773535788e706771))
* **bower.json:** incorrect reference to webcomponentsjs ([682ed683](http://github.com/aurelia/loader/commit/682ed68351dfb5817d5a007de62512af3de63842))
* **build:**
  * update linting, testing and tools ([3cba198f](http://github.com/aurelia/loader/commit/3cba198f9faedbbcd39a91f7dc212ef4e2236e0f))
  * add missing bower bump ([7b0a109d](http://github.com/aurelia/loader/commit/7b0a109da46d64d5aa39730068f8c4b598fc66e0))
* **loadTemplate:** refactor base url handling ([7cf42acf](http://github.com/aurelia/loader/commit/7cf42acfdf598ed1bb399cb3cda1a98c9b2b2beb))
* **loader:**
  * correct core-js import syntax ([95cc96b7](http://github.com/aurelia/loader/commit/95cc96b79763e81d562c4565b09006e6e918ec1b))
  * correct the LoaderPlugin interface defintion ([cd07a012](http://github.com/aurelia/loader/commit/cd07a012974149970e21d0599993823c7203f0f0))
  * change some types ([3b212821](http://github.com/aurelia/loader/commit/3b21282147f2bb663b6929dd56a64af15dc21e28))
  * Use correct import for core-js We were previously using `import core from core-j ([70e18d0f](http://github.com/aurelia/loader/commit/70e18d0f0108d4b11588b86c6b4ba964e6410cd9))
  * async problem with bundles views ([3b300e84](http://github.com/aurelia/loader/commit/3b300e845eb71494f5505d9212aae738ed7094a7), closes [#12](http://github.com/aurelia/loader/issues/12))
  * throw exception when no template found at view url ([b4cfe513](http://github.com/aurelia/loader/commit/b4cfe513dd91451d0ddf0b7f7f43f073f647939f))
* **package:**
  * change jspm directories ([64a8443b](http://github.com/aurelia/loader/commit/64a8443b6e1b4134393972448d431566108c8aa1))
  * update dependencies ([f468bb26](http://github.com/aurelia/loader/commit/f468bb263c3254e3b87fce07e671afeed4e74f67))
  * update dependencies ([0ca68f2d](http://github.com/aurelia/loader/commit/0ca68f2d0be882593f3f109b10546a3021f86d92))
  * update dependencies to latest versions ([bc8d5c7d](http://github.com/aurelia/loader/commit/bc8d5c7d7247107579d08d434d996de976fa0c28))
  * add missing polyfills ([178f6b08](http://github.com/aurelia/loader/commit/178f6b085deed728e71d72f20dbfde9f41287e1c))
* **template-registry-entry:**
  * correct types ([c10a7e4f](http://github.com/aurelia/loader/commit/c10a7e4fe844a76211b99867b67fedffac234bd2))
  * getElementsByTagName not available on document fragments ([c0d98338](http://github.com/aurelia/loader/commit/c0d983381ace9ef4fcbbda1d826bb3bdca1fdf43))
* **template-registry0entry:** changed property from id to address ([91cc7a0f](http://github.com/aurelia/loader/commit/91cc7a0f919edf7e7a5e59dedd3dd2b9c668aa4f))


#### Features

* **all:**
  * remove html imports and add generic loader plugin api ([95c9fc5e](http://github.com/aurelia/loader/commit/95c9fc5e2ad23fa9251234f4667d35e5a4786211))
  * add more type info ([5e778549](http://github.com/aurelia/loader/commit/5e778549d5b126bcb263c82216f51d042d6afcd5))
  * new template registry and global loader ([99ec5e2e](http://github.com/aurelia/loader/commit/99ec5e2edf5e4dd3f1c52d42cc413f66608710cf))
* **build:** update compile, switch to register modules, switch to core-js ([5b830212](http://github.com/aurelia/loader/commit/5b8302120909bbc6fbc0941ec4256299204c6e80))
* **docs:** generate api.json from .d.ts file ([57db0717](http://github.com/aurelia/loader/commit/57db071749e41e4a74d878a61abecf0dea2afd0c))
* **loader:**
  * add map and normalizeSync methods ([8afe34fa](http://github.com/aurelia/loader/commit/8afe34fa57ca07b69adabdeb6d2b678e9e87730b))
  * add support for view bundles ([8f2c45d6](http://github.com/aurelia/loader/commit/8f2c45d6780d66bcb290cc3cfdec1b8b0eaa9fc4))
  * add text loading abstraction ([3dcd1c2f](http://github.com/aurelia/loader/commit/3dcd1c2faa72ce00eeb3222382092ec578833bf8), closes [#8](http://github.com/aurelia/loader/issues/8))
* **template-registry-entry:** allow dynamically adding dependencies ([78bf4984](http://github.com/aurelia/loader/commit/78bf498447c439d936422c2e6b74e72f1d9f9ac3))
* **views:**
  * view imports are now done with <require> ([2e68de3c](http://github.com/aurelia/loader/commit/2e68de3c4d4063abd602af157e13e3dccda16bdf))
  * view imports are now done with <use> ([43b04172](http://github.com/aurelia/loader/commit/43b0417262578ac0578407c1b5e5880ba3351d45))


## 0.9.0 (2015-09-04)


#### Bug Fixes

* **build:** update linting, testing and tools ([3cba198f](http://github.com/aurelia/loader/commit/3cba198f9faedbbcd39a91f7dc212ef4e2236e0f))
* **loader:** correct the LoaderPlugin interface defintion ([cd07a012](http://github.com/aurelia/loader/commit/cd07a012974149970e21d0599993823c7203f0f0))
* **template-registry0entry:** changed property from id to address ([91cc7a0f](http://github.com/aurelia/loader/commit/91cc7a0f919edf7e7a5e59dedd3dd2b9c668aa4f))


#### Features

* **all:** remove html imports and add generic loader plugin api ([95c9fc5e](http://github.com/aurelia/loader/commit/95c9fc5e2ad23fa9251234f4667d35e5a4786211))
* **docs:** generate api.json from .d.ts file ([57db0717](http://github.com/aurelia/loader/commit/57db071749e41e4a74d878a61abecf0dea2afd0c))


### 0.8.7 (2015-08-14)


#### Bug Fixes

* **template-registry-entry:** correct types ([c10a7e4f](http://github.com/aurelia/loader/commit/c10a7e4fe844a76211b99867b67fedffac234bd2))


### 0.8.6 (2015-08-14)


#### Bug Fixes

* **loader:** change some types ([3b212821](http://github.com/aurelia/loader/commit/3b21282147f2bb663b6929dd56a64af15dc21e28))


### 0.8.5 (2015-08-14)

#### Bug Fixes

* **loader:** Fix typos in type info

### 0.8.4 (2015-08-14)


#### Bug Fixes

* **loader:** Use correct import for core-js We were previously using `import core from core-j ([70e18d0f](http://github.com/aurelia/loader/commit/70e18d0f0108d4b11588b86c6b4ba964e6410cd9))


#### Features

* **all:** add more type info ([5e778549](http://github.com/aurelia/loader/commit/5e778549d5b126bcb263c82216f51d042d6afcd5))


### 0.8.3 (2015-07-29)

* improve output file name

### 0.8.2 (2015-07-16)


#### Features

* **template-registry-entry:** allow dynamically adding dependencies ([78bf4984](http://github.com/aurelia/loader/commit/78bf498447c439d936422c2e6b74e72f1d9f9ac3))


### 0.8.1 (2015-07-13)


#### Bug Fixes

* **loader:** async problem with bundles views ([3b300e84](http://github.com/aurelia/loader/commit/3b300e845eb71494f5505d9212aae738ed7094a7), closes [#12](http://github.com/aurelia/loader/issues/12))


## 0.8.0 (2015-07-02)


## 0.7.0 (2015-06-08)


#### Features

* **loader:** add support for view bundles ([8f2c45d6](http://github.com/aurelia/loader/commit/8f2c45d6780d66bcb290cc3cfdec1b8b0eaa9fc4))


## 0.6.0 (2015-04-30)


#### Bug Fixes

* **bower.json:** incorrect reference to webcomponentsjs ([682ed683](http://github.com/aurelia/loader/commit/682ed68351dfb5817d5a007de62512af3de63842))


#### Features

* **loader:** add text loading abstraction ([3dcd1c2f](http://github.com/aurelia/loader/commit/3dcd1c2faa72ce00eeb3222382092ec578833bf8), closes [#8](http://github.com/aurelia/loader/issues/8))


## 0.5.0 (2015-04-09)


#### Bug Fixes

* **all:** update compiler and core-js imports ([a62dd4c3](http://github.com/aurelia/loader/commit/a62dd4c3a82ee9fba11f910a4ae3d0146f6c7ccb))
* **template-registry-entry:** getElementsByTagName not available on document fragments ([c0d98338](http://github.com/aurelia/loader/commit/c0d983381ace9ef4fcbbda1d826bb3bdca1fdf43))


## 0.4.0 (2015-03-24)


#### Bug Fixes

* **all:** properly export the TemplateRegistryEntry ([4c60c8f7](http://github.com/aurelia/loader/commit/4c60c8f77b53f1a34ab7a1825305d81d99d4b7d6))


#### Features

* **all:** new template registry and global loader ([99ec5e2e](http://github.com/aurelia/loader/commit/99ec5e2edf5e4dd3f1c52d42cc413f66608710cf))
* **views:**
  * view imports are now done with <require> ([2e68de3c](http://github.com/aurelia/loader/commit/2e68de3c4d4063abd602af157e13e3dccda16bdf))
  * view imports are now done with <use> ([43b04172](http://github.com/aurelia/loader/commit/43b0417262578ac0578407c1b5e5880ba3351d45))


### 0.3.5 (2015-02-28)


#### Bug Fixes

* **package:** change jspm directories ([64a8443b](http://github.com/aurelia/loader/commit/64a8443b6e1b4134393972448d431566108c8aa1))


### 0.3.4 (2015-02-27)


#### Bug Fixes

* **build:** add missing bower bump ([7b0a109d](http://github.com/aurelia/loader/commit/7b0a109da46d64d5aa39730068f8c4b598fc66e0))
* **package:** update dependencies ([f468bb26](http://github.com/aurelia/loader/commit/f468bb263c3254e3b87fce07e671afeed4e74f67))


### 0.3.3 (2015-01-24)


#### Bug Fixes

* **bower:** correct semver ranges ([430ba151](http://github.com/aurelia/loader/commit/430ba151e80add2bf57d049b773535788e706771))


### 0.3.2 (2015-01-22)


#### Bug Fixes

* **package:** update dependencies ([0ca68f2d](http://github.com/aurelia/loader/commit/0ca68f2d0be882593f3f109b10546a3021f86d92))


### 0.3.1 (2015-01-12)

* Update compiled output.

## 0.3.0 (2015-01-06)


#### Features

* **build:** update compile, switch to register modules, switch to core-js ([5b830212](http://github.com/aurelia/loader/commit/5b8302120909bbc6fbc0941ec4256299204c6e80))


## 0.2.0 (2014-12-17)


#### Bug Fixes

* **loadTemplate:** refactor base url handling ([7cf42acf](http://github.com/aurelia/loader/commit/7cf42acfdf598ed1bb399cb3cda1a98c9b2b2beb))
* **package:** update dependencies to latest versions ([bc8d5c7d](http://github.com/aurelia/loader/commit/bc8d5c7d7247107579d08d434d996de976fa0c28))


### 0.1.1 (2014-12-11)


#### Bug Fixes

* **loader:** throw exception when no template found at view url ([b4cfe513](http://github.com/aurelia/loader/commit/b4cfe513dd91451d0ddf0b7f7f43f073f647939f))


## 0.1.0 (2014-12-11)


#### Bug Fixes

* **package:** add missing polyfills ([178f6b08](http://github.com/aurelia/loader/commit/178f6b085deed728e71d72f20dbfde9f41287e1c))
