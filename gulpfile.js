let project_folder = require("path").basename(__dirname);
let sourсe_folder = "#src";

let fs = require("fs");

let path = {
	build: {
		html: project_folder + "/",
		css: project_folder + "/css/",
		js: project_folder + "/js/",
		img: project_folder + "/img/",
		fonts: project_folder + "/fonts/",
	},
	src: {
		html: [sourсe_folder + "/*.html", "!" + sourсe_folder + "/_*.html"],
		css: sourсe_folder + "/scss/style.scss",
		js: sourсe_folder + "/js/script.js",
		img: sourсe_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
		fonts: sourсe_folder + "/fonts/*.ttf",
	},
	watch: {
		html: sourсe_folder + "/**/*.html",
		css: sourсe_folder + "/scss/**/*.scss",
		js: sourсe_folder + "/js/**/*.js",
		img: sourсe_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
	},
	clean: "./" + project_folder + "/",
};

let { src, dest } = require("gulp"),
	gulp = require("gulp"),
	browsersync = require("browser-sync").create(),
	fileinclude = require("gulp-file-include"),
	del = require("del"),
	scss = require("gulp-sass")(require("sass")),
	autoprefixer = require("gulp-autoprefixer"),
	group_media = require("gulp-group-css-media-queries"),
	clean_css = require("gulp-clean-css"),
	rename = require("gulp-rename"),
	uglify = require("gulp-uglify-es").default,
	babel = require("gulp-babel"),
	imagemin = require("gulp-imagemin"),
	webp = require("gulp-webp"),
	webpHTML = require("gulp-webp-html"),
	webpCSS = require("gulp-webpcss"),
	svgSprite = require("gulp-svg-sprite"),
	svgmin = require("gulp-svgmin"),
	cheerio = require("gulp-cheerio"),
	replace = require("gulp-replace"),
	ttf2woff = require("gulp-ttf2woff"),
	ttf2woff2 = require("gulp-ttf2woff2"),
	fonter = require("gulp-fonter");

function browserSync(params) {
	browsersync.init({
		server: {
			baseDir: "./" + project_folder + "/",
		},
		port: 3000,
		notify: false,
	});
}

function html() {
	return src(path.src.html)
		.pipe(fileinclude())
		.pipe(webpHTML())
		.pipe(dest(path.build.html))
		.pipe(browsersync.stream());
}

function css() {
	return src(path.src.css)
		.pipe(
			scss({
				outputStyle: "expanded",
			}),
		)
		.pipe(group_media())
		.pipe(
			autoprefixer({
				overrideBrowserList: ["last 5 versions"],
				cascade: true,
			}),
		)
		.pipe(webpCSS())
		.pipe(dest(path.build.css))
		.pipe(clean_css())
		.pipe(
			rename({
				extname: ".min.css",
			}),
		)
		.pipe(dest(path.build.css))
		.pipe(browsersync.stream());
}

function js() {
	return src(path.src.js)
		.pipe(fileinclude())
		.pipe(dest(path.build.js))
		.pipe(uglify())
		.pipe(
			rename({
				extname: ".min.js",
			}),
		)
		.pipe(
			babel({
				presets: ["@babel/env"],
			}),
		)
		.pipe(dest(path.build.js))
		.pipe(browsersync.stream());
}

function images() {
	return src(path.src.img)
		.pipe(
			webp({
				quality: 70,
			}),
		)
		.pipe(dest(path.build.img))
		.pipe(src(path.src.img))
		.pipe(
			imagemin({
				interlaced: true,
				progressive: true,
				optimizationLevel: 3,
				svgoPlugins: [{ removeViewBox: false }],
			}),
		)
		.pipe(dest(path.build.img))
		.pipe(browsersync.stream());
}

function fonts(params) {
	src(path.src.fonts).pipe(ttf2woff()).pipe(dest(path.build.fonts));

	return src(path.src.fonts).pipe(ttf2woff2()).pipe(dest(path.build.fonts));
}

gulp.task("otf2ttf", function () {
	return src([sourсe_folder + "/fonts/*.otf"])
		.pipe(
			fonter({
				formats: ["ttf"],
			}),
		)

		.pipe(dest(sourсe_folder + "/fonts/"));
});

gulp.task("svgSprite", function () {
	return gulp
		.src([sourсe_folder + "/iconsprite/*.svg"])
		.pipe(
			svgmin({
				js2svg: {
					pretty: true,
				},
			}),
		)
		.pipe(
			cheerio({
				run: function ($) {
					$("[fill]").removeAttr("fill");
					$("[stroke]").removeAttr("stroke");
					$("[style]").removeAttr("style");
				},
				parserOptions: { xmlMode: true },
			}),
		)
		.pipe(replace("&gt;", ">"))
		.pipe(
			svgSprite({
				mode: {
					stack: {
						sprite: "../icons/icons.svg",
						// example: true,
					},
				},
			}),
		)
		.pipe(dest(path.build.img));
});

function fontsStyle(params) {
	let file_content = fs.readFileSync(sourсe_folder + "/scss/fonts.scss");
	if (file_content == "") {
		fs.writeFile(sourсe_folder + "/scss/fonts.scss", "", cb);
		return fs.readdir(path.build.fonts, function (err, items) {
			if (items) {
				let c_fontname;
				for (var i = 0; i < items.length; i++) {
					let fontname = items[i].split(".");
					fontname = fontname[0];
					if (c_fontname != fontname) {
						fs.appendFile(
							sourсe_folder + "/scss/fonts.scss",
							'@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n',
							cb,
						);
					}
					c_fontname = fontname;
				}
			}
		});
	}
}

function cb() {}

function watchFiles(param) {
	gulp.watch([path.watch.html], html);
	gulp.watch([path.watch.css], css);
	gulp.watch([path.watch.js], js);
	gulp.watch([path.watch.img], images);
}

function clean(params) {
	return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(html, css, js, images, fonts), fontsStyle);
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.fontsStyle = fontsStyle;
exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;
