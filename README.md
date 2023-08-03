# ddc-filter-sorter_dup

It is dup order sorter.  The higher is the duplicated word.

NOTE: It must be "postFilters".

## Required

### denops.vim
https://github.com/vim-denops/denops.vim

### ddc.vim
https://github.com/Shougo/ddc.vim


## Configuration

```vim
call ddc#custom#patch_global('postFilters', ['sorter_dup'])
```
