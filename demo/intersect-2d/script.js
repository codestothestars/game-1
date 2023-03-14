const canvas = document.getElementsByTagName('canvas')[0]
const contextOption = canvas.getContext('2d')

const indicatorOption = document.querySelector('#intersecting #indicator')

const line1Option = document.forms.namedItem('line1')
const line2Option = document.forms.namedItem('line2')

if (!contextOption) throw 'Failed to get canvas context.'
if (!indicatorOption) throw 'Failed to get intersecting indicator.'
if (!line1Option || !line2Option) throw 'Failed to get coordinate forms.'

const context = contextOption
const indicator = indicatorOption
const line1 = line1Option
const line2 = line2Option

const line1DestinationXOption = line1.elements.namedItem('destinationX')
const line1DestinationYOption = line1.elements.namedItem('destinationY')
const line1OriginXOption = line1.elements.namedItem('originX')
const line1OriginYOption = line1.elements.namedItem('originY')
const line2DestinationXOption = line2.elements.namedItem('destinationX')
const line2DestinationYOption = line2.elements.namedItem('destinationY')
const line2OriginXOption = line2.elements.namedItem('originX')
const line2OriginYOption = line2.elements.namedItem('originY')

if (
  !(line1DestinationXOption instanceof HTMLInputElement) ||
  !(line1DestinationYOption instanceof HTMLInputElement) ||
  !(line1OriginXOption instanceof HTMLInputElement) ||
  !(line1OriginYOption instanceof HTMLInputElement) ||
  !(line2DestinationXOption instanceof HTMLInputElement) ||
  !(line2DestinationYOption instanceof HTMLInputElement) ||
  !(line2OriginXOption instanceof HTMLInputElement) ||
  !(line2OriginYOption instanceof HTMLInputElement)
) throw 'Failed to get coordinate inputs.'

const degrees = /** @type const **/({
  180: Math.PI,
  360: Math.PI * 2
})

const line1DestinationXInput = line1DestinationXOption
const line1DestinationYInput = line1DestinationYOption
const line1OriginXInput = line1OriginXOption
const line1OriginYInput = line1OriginYOption
const line2DestinationXInput = line2DestinationXOption
const line2DestinationYInput = line2DestinationYOption
const line2OriginXInput = line2OriginXOption
const line2OriginYInput = line2OriginYOption

class Line {
  /** @type [number, number] */
  destination

  /** @type [number, number] */
  origin

  /**
   * @param {[number, number]} origin 
   * @param {[number, number]} destination 
   */
  constructor(origin, destination) {
    this.origin = origin
    this.destination = destination
  }

  /**
   * Indicates whether the line segments AB and CD intersect
   * 
   * @param {Line} line 
   */
  intersects(line) {
    return counterClockwisePoints(this.origin, line.origin, line.destination) != counterClockwisePoints(this.destination, line.origin, line.destination) && counterClockwisePoints(this.origin, this.destination, line.origin) != counterClockwisePoints(this.origin, this.destination, line.destination)
  }
}

draw()

document.body.addEventListener('input', draw)

/**
 * Indicates whether three points form a counter-clockwise angle.
 * 
 * @param {[number, number]} a 
 * @param {[number, number]} b 
 * @param {[number, number]} c 
 */
function counterClockwisePoints(a, b, c) {
  return (c[1] - a[1]) * (b[0] - a[0]) > (b[1] - a[1]) * (c[0] - a[0])
}

function draw() {
  const line1DestinationX = parseInt(line1DestinationXInput.value)
  const line1DestinationY = parseInt(line1DestinationYInput.value)
  const line1OriginX = parseInt(line1OriginXInput.value)
  const line1OriginY = parseInt(line1OriginYInput.value)
  const line2DestinationX = parseInt(line2DestinationXInput.value)
  const line2DestinationY = parseInt(line2DestinationYInput.value)
  const line2OriginX = parseInt(line2OriginXInput.value)
  const line2OriginY = parseInt(line2OriginYInput.value)

  context.beginPath()
  context.clearRect(0, 0, canvas.width, canvas.height)

  context.strokeStyle = 'blue'
  context.moveTo(line1OriginX, line1OriginY)
  context.lineTo(line1DestinationX, line1DestinationY)
  context.stroke()
  context.beginPath()
  context.strokeStyle = 'orange'
  context.moveTo(line2OriginX, line2OriginY)
  context.lineTo(line2DestinationX, line2DestinationY)
  context.stroke()

  indicator.classList.toggle(
    'on',
    new Line([line1OriginX, line1OriginY], [line1DestinationX, line1DestinationY])
      .intersects(new Line([line2OriginX, line2OriginY], [line2DestinationX, line2DestinationY]))
  )
}

export { }
