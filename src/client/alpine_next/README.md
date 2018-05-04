
# Alpine NEXT
## The defacto Granular CSS Framework

__Please leverage as much of our dependency on bootstrap3 `app/lib/bootstrap3` as you can
to reduce code duplication and leverage Bootstrap's online docs!__

# Page template

```html
<div class="content-page-header --fixed" al-elem-padder-source="page">
    <div class="container">
        MY HEADERBAR CONTENT HERE !!!
    </div>
</div>
<div al-elem-padder="page"></div> 

<div class="container">
	MY PAGE CONTENT HERE !!!
</div>

```

### Explanation:

Showing the headerbar:
- `content-page-header` - page header background
- `--fixed` - page header is fixed (to original position; top is not set)

So we have the headerbar but we want to push the content with the height of the page header.
This is where `al-elem-padder-source` and `al-elem-padder` come into place.

- `al-elem-padder-source` - this will provide the height of what to be pushed down; it sets the value in the `page` source
- `al-elem-padder` - this is the element that will have the height set to whatever comes from the `page` variable.

# Forms

```html
<div class="modal-header">
	<!-- the popup title -->
	<h1 class="modal-header-h1">
		Some popup title
		<span class="pull-right text-required">* Required</span>
	</h1>
</div>
<div class="modal-body">
	<!-- the header -->
	<div class="al-panel --form-header --pad">
		<div class="row">
			<div class="col-sm-6"><input></div>
			<div class="col-sm-6">icon goes here</div>		
		</div>	
	</div>
	<!-- use horizontal-form; except for al-panel and --form --pad all is bootstrap markup -->
	<div class="al-panel --form --pad form-horizontal">
		<div class="form-group">
			<label class="col-sm-4 label control-label">Label for input</div>
			<div class="col-sm-4"><input></div>
		</div>
	</div>
	<al-section>
		<al-section-title>Title Goes Here</al-section-title>
		<al-section-content>Content Goes Here</al-section-content>
   </al-section>
</div>
<div class="modal-footer">
	<button class="btn btn-default">Close</button>
</div> 
```

